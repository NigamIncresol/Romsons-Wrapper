const express = require("express");
const router = express.Router();

const PORT = process.env.PORT || 3000;
const apis = require("../apis.json");

// Helper to escape HTML special chars inside <pre> blocks
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Helper to escape backticks for inline onclick template literals
function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

router.get("/", (req, res) => {

  // GROUP BY APP
  const grouped = apis.reduce((acc, api) => {
    acc[api.app] = acc[api.app] || [];
    acc[api.app].push(api);
    return acc;
  }, {});

  const totalApis = apis.length;
  const totalApps = Object.keys(grouped).length;

  const groupedHtml = Object.keys(grouped).map(app => `
    <div class="section">
      <div class="section-header">
        <span class="section-title">${app}</span>
        <span class="section-count">${grouped[app].length}</span>
      </div>
      <div class="cards-grid">
        ${grouped[app].map((api, idx) => {
          const cardId        = `card-${app.replace(/\s+/g, "-")}-${idx}`;
          const payload       = api.requestPayload  ? JSON.stringify(api.requestPayload,  null, 2) : null;
          const response      = api.response        ? JSON.stringify(api.response,        null, 2) : null;
          const requestParams = api.requestParams   ? JSON.stringify(api.requestParams,   null, 2) : null;
          const requestQuery  = api.requestQuery    ? JSON.stringify(api.requestQuery,    null, 2) : null;
          const odataEndpoint = api.odataV2Endpoint || null;
          const note          = api.Note || "";

          const payloadEsc      = payload      ? escapeForTemplateLiteral(payload)      : "";
          const responseEsc     = response     ? escapeForTemplateLiteral(response)     : "";
          const paramsEsc       = requestParams ? escapeForTemplateLiteral(requestParams) : "";
          const queryEsc        = requestQuery  ? escapeForTemplateLiteral(requestQuery)  : "";
          const odataEsc        = odataEndpoint ? escapeForTemplateLiteral(odataEndpoint) : "";

          return `
          <div class="api-card" id="${cardId}"
               data-name="${api.name.toLowerCase()}"
               data-endpoint="${api.endpoint.toLowerCase()}"
               data-app="${app.toLowerCase()}">

            <!-- Header row (click to expand) -->
            <div class="card-header-row" onclick="togglePanel('${cardId}')">
              <span class="method-badge m-${api.method.toLowerCase()}">${api.method}</span>
              <div class="card-info">
                <div class="card-name">
                  ${api.name}
                  ${api.implemented === true
                    ? `<span class="impl-badge impl-yes" title="Implemented in frontend">✓ Implemented</span>`
                    : `<span class="impl-badge impl-no" title="Not yet implemented in frontend">✗ Not Implemented</span>`
                  }
                </div>
                <div class="card-endpoint">${api.endpoint}</div>
              </div>
              <div class="card-actions">
                <button class="copy-btn"
                  onclick="event.stopPropagation(); copyEndpoint(this, '${api.endpoint}')"
                  title="Copy endpoint">&#x2398;</button>
                <span class="chevron" id="chevron-${cardId}">&#8964;</span>
              </div>
            </div>

            <!-- Expandable panel -->
            <div class="expand-panel" id="panel-${cardId}">
              <div class="panel-inner">

                ${note ? `
                <!-- Note -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-yellow"></span>
                    Note
                  </div>
                  <div class="note-box">${escapeHtml(note)}</div>
                </div>
                ` : ""}

                ${odataEndpoint ? `
                <!-- oData V2 Endpoint -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-blue"></span>
                    oData V2 Endpoint
                    <button class="inline-copy float-right" onclick="copyFlash(this, \`${odataEsc}\`)" title="Copy">&#x2398;</button>
                  </div>
                  <div class="panel-code odata-code">
                    <span class="odata-text odata-wrap">${escapeHtml(odataEndpoint)}</span>
                  </div>
                </div>
                ` : ""}

                ${requestParams ? `
                <!-- Request Params -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-purple"></span>
                    Request Params
                    <button class="inline-copy float-right" onclick="copyFlash(this, \`${paramsEsc}\`)" title="Copy">&#x2398;</button>
                  </div>
                  <pre class="panel-code json-block">${escapeHtml(requestParams)}</pre>
                </div>
                ` : ""}

                ${requestQuery ? `
                <!-- Request Query -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-teal"></span>
                    Request Query
                    <button class="inline-copy float-right" onclick="copyFlash(this, \`${queryEsc}\`)" title="Copy">&#x2398;</button>
                  </div>
                  <pre class="panel-code json-block">${escapeHtml(requestQuery)}</pre>
                </div>
                ` : ""}

                ${payload ? `
                <!-- Request Payload -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-amber"></span>
                    Request Payload
                    <button class="inline-copy float-right" onclick="copyFlash(this, \`${payloadEsc}\`)" title="Copy">&#x2398;</button>
                  </div>
                  <pre class="panel-code json-block">${escapeHtml(payload)}</pre>
                </div>
                ` : ""}

                ${response ? `
                <!-- Response -->
                <div class="panel-section">
                  <div class="panel-label">
                    <span class="label-dot dot-green"></span>
                    Response
                    <button class="inline-copy float-right" onclick="copyFlash(this, \`${responseEsc}\`)" title="Copy">&#x2398;</button>
                  </div>
                  <pre class="panel-code json-block">${escapeHtml(response)}</pre>
                </div>
                ` : ""}

              </div>
            </div>

          </div>
          `;
        }).join("")}
      </div>
    </div>
  `).join("");

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Romsons API Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-base:           #0d1117;
      --bg-card:           #161b22;
      --bg-hover:          #1c2128;
      --bg-code:           #0d1117;
      --border:            #21262d;
      --border-2:          #30363d;
      --text-main:         #e6edf3;
      --text-muted:        #8b949e;
      --note-bg:           #ffffff;
      --note-text:         #1a1a1a;
      --note-border:       #f0e040;
      --alert-bg:          #1a1a2e;
      --alert-border:      #e8a020;
      --alert-desc:        #d4a84a;
      --alert-step-bg:     rgba(232,160,32,0.1);
      --alert-step-border: rgba(232,160,32,0.3);
      --alert-step-text:   #f0c060;
    }

    body.light {
      --bg-base:           #f6f8fa;
      --bg-card:           #ffffff;
      --bg-hover:          #f0f2f5;
      --bg-code:           #f0f2f5;
      --border:            #d0d7de;
      --border-2:          #b0bac5;
      --text-main:         #1a1a2e;
      --text-muted:        #57606a;
      --note-bg:           #fffbe6;
      --note-text:         #1a1a1a;
      --note-border:       #e8a020;
      --alert-bg:          #fff8e6;
      --alert-border:      #e8a020;
      --alert-desc:        #a06800;
      --alert-step-bg:     rgba(232,160,32,0.08);
      --alert-step-border: rgba(232,160,32,0.4);
      --alert-step-text:   #8a5500;
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg-base);
      color: var(--text-main);
      padding: 24px 20px;
      transition: background 0.25s, color 0.25s;
    }

    .container { max-width: 900px; margin: auto; }

    /* ── Alert Banner ── */
    .alert-banner {
      background: var(--alert-bg);
      border: 1px solid var(--alert-border);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      transition: background 0.25s, border-color 0.25s;
    }
    .alert-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
    .alert-title {
      font-family: 'Space Mono', monospace;
      font-size: 11px; font-weight: 700;
      color: #e8a020; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 6px;
    }
    .alert-desc { font-size: 13px; color: var(--alert-desc); margin-bottom: 10px; }
    .alert-steps { display: flex; flex-wrap: wrap; gap: 8px; }
    .alert-step {
      display: flex; align-items: center; gap: 6px;
      background: var(--alert-step-bg);
      border: 1px solid var(--alert-step-border);
      border-radius: 6px; padding: 5px 10px;
      font-size: 12px; color: var(--alert-step-text);
      font-family: 'Space Mono', monospace;
    }
    .step-num {
      background: #e8a020; color: #1a1a2e;
      border-radius: 50%; width: 16px; height: 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; flex-shrink: 0;
    }

    /* ── Header ── */
    .header-row {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-badge {
      width: 38px; height: 38px; border-radius: 10px;
      background: linear-gradient(135deg, #4f8ef7, #3dd68c);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Space Mono', monospace;
      font-weight: 700; font-size: 16px; color: #fff;
    }
    .brand-name { font-size: 16px; font-weight: 600; color: var(--text-main); letter-spacing: -0.3px; }
    .brand-sub  { font-size: 12px; color: var(--text-muted); }

    .header-right { display: flex; align-items: center; gap: 8px; }

    .stat-pills { display: flex; gap: 8px; }
    .stat-pill {
      background: var(--bg-card);
      border: 0.5px solid var(--border-2);
      border-radius: 20px; padding: 5px 12px;
      font-size: 12px; color: var(--text-muted);
      font-family: 'Space Mono', monospace;
      transition: background 0.25s, border-color 0.25s;
    }
    .stat-pill span { color: var(--text-main); font-weight: 700; }

    /* ── Theme Toggle ── */
    .theme-toggle {
      background: var(--bg-card);
      border: 0.5px solid var(--border-2);
      border-radius: 8px;
      padding: 7px 11px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      transition: all 0.15s;
    }
    .theme-toggle:hover {
      border-color: #4f8ef7;
      background: var(--bg-hover);
    }

    /* ── Search ── */
    .search-wrap { position: relative; margin-bottom: 20px; }
    .search-icon {
      position: absolute; left: 13px; top: 50%;
      transform: translateY(-50%);
      font-size: 15px; color: var(--text-muted); pointer-events: none;
    }
    .search-input {
      width: 100%; padding: 11px 14px 11px 38px;
      border-radius: 10px; border: 0.5px solid var(--border-2);
      background: var(--bg-card); color: var(--text-main);
      font-size: 14px; font-family: 'DM Sans', sans-serif;
      outline: none; transition: border-color 0.15s, background 0.25s;
    }
    .search-input::placeholder { color: var(--text-muted); }
    .search-input:focus {
      border-color: #4f8ef7;
      box-shadow: 0 0 0 2px rgba(79,142,247,0.15);
    }

    /* ── Sections ── */
    .section { margin-bottom: 24px; }
    .section-header {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 10px; padding-bottom: 8px;
      border-bottom: 0.5px solid var(--border);
      transition: border-color 0.25s;
    }
    .section-title {
      font-size: 11px; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.8px;
      font-family: 'Space Mono', monospace;
    }
    .section-count {
      background: rgba(79,142,247,0.12); color: #4f8ef7;
      font-size: 11px; font-family: 'Space Mono', monospace;
      font-weight: 700; padding: 2px 8px; border-radius: 10px;
    }

    /* ── Cards ── */
    .cards-grid { display: flex; flex-direction: column; gap: 6px; }

    .api-card {
      background: var(--bg-card);
      border: 0.5px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      transition: border-color 0.2s, background 0.25s;
    }
    .api-card:hover { border-color: var(--border-2); }
    .api-card.open  { border-color: #4f8ef7; }

    .card-header-row {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 14px;
      cursor: pointer; user-select: none;
      transition: background 0.15s;
    }
    .card-header-row:hover { background: var(--bg-hover); }

    .method-badge {
      font-family: 'Space Mono', monospace;
      font-size: 10px; font-weight: 700;
      padding: 3px 8px; border-radius: 5px;
      width: 56px; text-align: center; flex-shrink: 0;
    }
    .m-get    { color: #1a9c5e; background: rgba(29,158,92,0.1); }
    .m-post   { color: #3a7fd8; background: rgba(58,127,216,0.1); }
    .m-put    { color: #c07b10; background: rgba(192,123,16,0.1); }
    .m-delete { color: #c0392b; background: rgba(192,57,43,0.1); }
    .m-patch  { color: #7c5cbf; background: rgba(124,92,191,0.1); }

    .card-info { flex: 1; min-width: 0; }
    .card-name {
      font-size: 14px; font-weight: 500; color: var(--text-main);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* ── Full endpoint visibility (wraps instead of truncating) ── */
    .card-endpoint {
      font-size: 12px; color: var(--text-muted);
      font-family: 'Space Mono', monospace;
      word-break: break-all;
      white-space: normal;
      margin-top: 2px;
      line-height: 1.5;
    }

    .card-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; align-self: flex-start; margin-top: 2px; }

    .copy-btn {
      background: none; border: 0.5px solid var(--border-2);
      border-radius: 6px; padding: 5px 9px;
      cursor: pointer; color: var(--text-muted); font-size: 14px;
      transition: all 0.15s;
    }
    .copy-btn:hover  { border-color: #4f8ef7; color: #4f8ef7; background: rgba(79,142,247,0.07); }
    .copy-btn.copied { border-color: #1a9c5e; color: #1a9c5e; background: rgba(29,158,92,0.08); }

    .chevron {
      font-size: 20px; color: var(--text-muted);
      transition: transform 0.25s;
      line-height: 1; display: inline-block;
    }
    .chevron.rotated { transform: rotate(180deg); }

    /* ── Expand Panel ── */
    .expand-panel {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
    }
    .expand-panel.open { max-height: 6000px; }

    .panel-inner {
      border-top: 0.5px solid var(--border);
      padding: 16px 14px;
      display: flex; flex-direction: column;
      gap: 16px;
      transition: border-color 0.25s;
    }

    .panel-label {
      display: flex; align-items: center; gap: 7px;
      font-size: 11px; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.7px;
      font-family: 'Space Mono', monospace;
      margin-bottom: 8px;
    }
    .label-dot   { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .dot-blue    { background: #4f8ef7; }
    .dot-amber   { background: #e8a020; }
    .dot-green   { background: #3dd68c; }
    .dot-yellow  { background: #f0e040; }
    .dot-purple  { background: #a78bfa; }
    .dot-teal    { background: #2dd4bf; }
    .float-right { margin-left: auto; }

    .panel-code {
      background: var(--bg-code);
      border: 0.5px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'Space Mono', monospace;
      font-size: 12px; color: var(--text-main);
      overflow-x: auto;
      transition: background 0.25s, border-color 0.25s, color 0.25s;
    }

    /* ── oData endpoint: full wrap, no truncation ── */
    .odata-code {
      display: block;
      padding: 10px 40px 10px 14px;
      position: relative;
    }
    .odata-wrap {
      color: #4f8ef7;
      word-break: break-all;
      white-space: normal;
      display: block;
      line-height: 1.6;
    }
    .odata-code .inline-copy {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .json-block { white-space: pre; line-height: 1.65; }

    .inline-copy {
      background: none; border: 0.5px solid var(--border-2);
      border-radius: 5px; padding: 3px 7px;
      cursor: pointer; color: var(--text-muted); font-size: 12px;
      flex-shrink: 0; transition: all 0.15s;
    }
    .inline-copy:hover  { border-color: #4f8ef7; color: #4f8ef7; }
    .inline-copy.copied { border-color: #1a9c5e; color: #1a9c5e; }

    /* ── Note Box ── */
    .note-box {
      background: var(--note-bg);
      color: var(--note-text);
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      line-height: 1.6;
      border-left: 4px solid var(--note-border);
      white-space: pre-wrap;
      word-break: break-word;
      transition: background 0.25s;
    }

    /* ── Empty / Footer ── */
    .empty-state {
      text-align: center; padding: 48px 20px;
      color: var(--text-muted); font-size: 14px; display: none;
    }
    .footer {
      margin-top: 28px; padding-top: 14px;
      border-top: 0.5px solid var(--border);
      display: flex; align-items: center;
      justify-content: space-between;
      font-size: 12px; color: var(--text-muted);
      font-family: 'Space Mono', monospace;
      transition: border-color 0.25s;
    }
    .online-dot {
      display: inline-block; width: 7px; height: 7px;
      border-radius: 50%; background: #3dd68c;
      margin-right: 6px; animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }

    /* ── Implemented Badge ── */
    .impl-badge {
      display: inline-flex; align-items: center;
      font-size: 10px; font-weight: 700;
      font-family: 'Space Mono', monospace;
      padding: 2px 7px; border-radius: 4px;
      margin-left: 8px; vertical-align: middle;
      letter-spacing: 0.3px;
    }
    .impl-yes {
      color: #1a9c5e;
      background: rgba(29,158,92,0.12);
      border: 0.5px solid rgba(29,158,92,0.35);
    }
    .impl-no {
      color: #8b949e;
      background: rgba(139,148,158,0.1);
      border: 0.5px solid rgba(139,148,158,0.25);
    }
  </style>
</head>
<body>
<div class="container">

  <!-- Alert Banner -->
  <div class="alert-banner">
    <div class="alert-icon">⚠️</div>
    <div>
      <div class="alert-title">Required before starting</div>
      <div class="alert-desc">Complete both steps below before making any requests.</div>
      <div class="alert-steps">
        <div class="alert-step">
          <div class="step-num">1</div>
          Run <strong>ngrok</strong> and note your tunnel URL
        </div>
        <div class="alert-step">
          <div class="step-num">2</div>
          Connect to <strong>Romsons VPN</strong>
        </div>
      </div>
    </div>
  </div>

  <!-- Header -->
  <div class="header-row">
    <div class="brand">
      <div class="brand-badge">R</div>
      <div>
        <div class="brand-name">Romsons Backend</div>
        <div class="brand-sub">API Dashboard</div>
      </div>
    </div>
    <div class="header-right">
      <div class="stat-pills">
        <div class="stat-pill">APIs: <span>${totalApis}</span></div>
        <div class="stat-pill">Apps: <span>${totalApps}</span></div>
      </div>
      <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle theme">🌙</button>
    </div>
  </div>

  <!-- Search -->
  <div class="search-wrap">
    <span class="search-icon">&#128269;</span>
    <input class="search-input" id="searchBox"
      placeholder="Search by name, endpoint or app..."
      oninput="searchAPI(this.value)" />
  </div>

  <!-- API Groups -->
  <div id="apiContent">
    ${groupedHtml}
  </div>

  <div class="empty-state" id="emptyState">No APIs match your search.</div>

  <!-- Footer -->
  <div class="footer">
    <div><span class="online-dot"></span>Dashboard live</div>
    <div>Node ${process.version}</div>
  </div>

</div>
<script>
  function togglePanel(cardId) {
    const card    = document.getElementById(cardId);
    const panel   = document.getElementById('panel-' + cardId);
    const chevron = document.getElementById('chevron-' + cardId);
    const isOpen  = panel.classList.contains('open');
    panel.classList.toggle('open',    !isOpen);
    chevron.classList.toggle('rotated', !isOpen);
    card.classList.toggle('open',     !isOpen);
  }

  function searchAPI(value) {
    value = value.toLowerCase().trim();
    const sections = document.querySelectorAll('.section');
    let totalVisible = 0;
    sections.forEach(section => {
      let sectionVisible = 0;
      section.querySelectorAll('.api-card').forEach(card => {
        const match = !value ||
          card.dataset.name.includes(value) ||
          card.dataset.endpoint.includes(value) ||
          card.dataset.app.includes(value);
        card.style.display = match ? 'block' : 'none';
        if (match) sectionVisible++;
      });
      section.style.display = sectionVisible > 0 ? 'block' : 'none';
      totalVisible += sectionVisible;
    });
    document.getElementById('emptyState').style.display =
      totalVisible === 0 ? 'block' : 'none';
  }

  function copyEndpoint(btn, endpoint) {
    navigator.clipboard.writeText(endpoint).then(() => {
      btn.classList.add('copied');
      btn.textContent = '✓';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '&#x2398;';
      }, 1500);
    });
  }

  function copyFlash(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const orig = btn.innerHTML;
      btn.textContent = '✓';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = orig || '&#x2398;';
      }, 1500);
    });
  }

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    document.getElementById('themeToggle').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  // Restore saved preference on load
  (function () {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      document.getElementById('themeToggle').textContent = '☀️';
    }
  })();
</script>
</body>
</html>
  `);
});

module.exports = router;