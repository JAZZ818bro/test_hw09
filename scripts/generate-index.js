import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to parse simple YAML frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }
  const yamlText = match[1];
  const body = match[2];
  const data = {};

  const lines = yamlText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    // Check array [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) {
        data[key] = [];
      } else {
        data[key] = inner.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }
    } else {
      // Remove quotes
      val = val.replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  }

  return { data, body };
}

function scanIncidents() {
  const incidentsDir = path.join(rootDir, 'incidents');
  if (!fs.existsSync(incidentsDir)) return [];

  const results = [];
  const years = fs.readdirSync(incidentsDir).filter(y => fs.statSync(path.join(incidentsDir, y)).isDirectory());

  for (const year of years) {
    const yearDir = path.join(incidentsDir, year);
    const eventFolders = fs.readdirSync(yearDir).filter(f => fs.statSync(path.join(yearDir, f)).isDirectory());

    for (const folder of eventFolders) {
      const eventDir = path.join(yearDir, folder);
      const indexPath = path.join(eventDir, 'index.md');
      const timelinePath = path.join(eventDir, 'timeline.md');
      const techPath = path.join(eventDir, 'technical-analysis.md');
      const refPath = path.join(eventDir, 'references.md');

      if (!fs.existsSync(indexPath)) continue;

      const indexRaw = fs.readFileSync(indexPath, 'utf-8');
      const { data: meta, body: indexBody } = parseFrontmatter(indexRaw);

      const timelineBody = fs.existsSync(timelinePath) ? fs.readFileSync(timelinePath, 'utf-8') : '';
      const techBody = fs.existsSync(techPath) ? fs.readFileSync(techPath, 'utf-8') : '';
      const refBody = fs.existsSync(refPath) ? fs.readFileSync(refPath, 'utf-8') : '';

      // Validate 8 standard chapters
      const combined = `${indexBody}\n${timelineBody}\n${techBody}\n${refBody}`;
      const validation = {
        hasOverview: /01\.\s*事件概述/.test(combined),
        hasTimeline: /02\.\s*事件時間軸/.test(combined),
        hasThreatApproach: /03\.\s*攻擊手法/.test(combined),
        hasTechAnalysis: /04\.\s*技術分析/.test(combined),
        hasImpact: /05\.\s*影響與損害/.test(combined),
        hasDefense: /06\.\s*防禦與改善/.test(combined),
        hasLessons: /07\.\s*研究心得/.test(combined),
        hasReferences: /08\.\s*參考資料/.test(combined),
      };

      // Extract references for Sources tab
      const refMatches = [...refBody.matchAll(/\[(.*?)\]\((https?:\/\/[^\s\)]+)\)\s*(?:-\s*(.*?))?(?:\n|$)/g)];
      const extractedSources = refMatches.map(m => ({
        title: m[1],
        url: m[2],
        note: m[3] ? m[3].trim() : '',
        incidentId: meta.id || folder,
        incidentTitle: meta.title || folder,
      }));

      results.push({
        id: meta.id || folder,
        folderName: folder,
        year,
        title: meta.title || folder,
        date: meta.date || '待確認',
        discoveryDate: meta.discovery_date || '待確認',
        target: meta.target || '待確認',
        industry: meta.industry || '一般',
        severity: meta.severity || 'Medium',
        evidenceStatus: meta.evidence_status || 'tbc',
        cve: Array.isArray(meta.cve) ? meta.cve : [],
        threatActor: meta.threat_actor || '待確認',
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        summary: meta.summary || '',
        validation,
        extractedSources,
        sections: {
          index: indexBody,
          timeline: timelineBody,
          technicalAnalysis: techBody,
          references: refBody,
        }
      });
    }
  }

  // Sort by date descending
  return results.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function scanTechniques() {
  const dir = path.join(rootDir, 'techniques');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const results = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    results.push({
      id: data.id || file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      mitreId: data.mitre_id || '',
      tactic: data.tactic || '',
      severity: data.severity || 'Medium',
      summary: data.summary || '',
      content: body,
      fileName: file,
    });
  }
  return results;
}

function scanVulnerabilities() {
  const dir = path.join(rootDir, 'vulnerabilities');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const results = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    results.push({
      cveId: data.cve_id || file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      cvss: data.cvss || 'N/A',
      severity: data.severity || 'Medium',
      cwe: data.cwe || '',
      affectedSystems: data.affected_systems || '',
      patchStatus: data.patch_status || '待確認',
      publishedDate: data.published_date || '',
      summary: data.summary || '',
      content: body,
      fileName: file,
    });
  }
  return results;
}

function scanResearchNotes() {
  const dir = path.join(rootDir, 'research-notes');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const results = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    results.push({
      id: data.id || file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      author: data.author || '資安研究員',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      summary: data.summary || '',
      content: body,
      fileName: file,
    });
  }
  return results;
}

function generate() {
  console.log('[Index Generator] Scanning Cyber Incident Archive data...');
  const incidents = scanIncidents();
  const techniques = scanTechniques();
  const vulnerabilities = scanVulnerabilities();
  const researchNotes = scanResearchNotes();

  // Aggregate sources
  const allSources = [];
  incidents.forEach(inc => {
    if (inc.extractedSources) {
      allSources.push(...inc.extractedSources);
    }
  });

  const dataset = {
    generatedAt: new Date().toISOString(),
    stats: {
      totalIncidents: incidents.length,
      totalTechniques: techniques.length,
      totalVulnerabilities: vulnerabilities.length,
      totalResearchNotes: researchNotes.length,
      totalSources: allSources.length,
    },
    incidents,
    techniques,
    vulnerabilities,
    researchNotes,
    sources: allSources,
  };

  const outputDir = path.join(rootDir, 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'archive-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2), 'utf-8');
  console.log(`[Index Generator] Successfully indexed ${incidents.length} incidents, ${techniques.length} techniques, ${vulnerabilities.length} vulnerabilities, ${researchNotes.length} research notes.`);
  console.log(`[Index Generator] Output saved to: ${outputPath}`);
}

generate();
