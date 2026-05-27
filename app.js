const STORE_KEY = "automsg_elite_crm_v1";

const navItems = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "connect", label: "Connect Account", icon: "link" },
  { id: "messageBot", label: "Message Bot", icon: "reply" },
  { id: "templateBot", label: "Template Bot", icon: "bot" },
  { id: "templates", label: "Templates", icon: "scroll-text" },
  { id: "campaigns", label: "Campaigns", icon: "megaphone" },
  { id: "bulkCampaigns", label: "Bulk Campaigns", icon: "send-to-back" },
  { id: "activityLog", label: "Activity Log", icon: "activity" },
  { id: "chat", label: "Chat", icon: "messages-square" },
  { id: "cannedReply", label: "Canned Reply", icon: "square-pen" },
  { id: "aiPrompts", label: "AI Prompts", icon: "pen-line" },
  { id: "settings", label: "Settings", icon: "settings" }
];

const defaultState = {
  session: null,
  qrSeed: 0,
  customers: [
    {
      id: "cust_1001",
      business: "Demo Fashion Store",
      owner: "Rahul Demo",
      phone: "+91 90000 00000",
      email: "demo@automsg.local",
      username: "customer",
      password: "123456",
      plan: "7 Days Trial",
      expiresAt: addDays(7),
      active: true,
      permissions: ["overview", "connect", "messageBot", "templates", "campaigns", "chat", "cannedReply", "settings"],
      connected: { whatsapp: true, instagram: false, facebook: false, telegram: false },
      campaigns: [
        { title: "New arrivals broadcast", channel: "WhatsApp", status: "Scheduled", date: today() },
        { title: "Instagram daily product post", channel: "Instagram", status: "Draft", date: today() }
      ],
      replies: ["Hello, welcome to our store. How can we help you?", "Price details sent. Please confirm size and color.", "Thank you for your order. Delivery update will be shared soon."],
      logs: ["WhatsApp QR connected", "Template approved: Order Confirmation", "Campaign created: New arrivals broadcast"]
    }
  ]
};

let state = loadState();
let activePage = "overview";
let drawerOpen = false;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  if (!saved) return structuredClone(defaultState);
  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function icon(name, size = 19) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
}

function whatsappLogo(size = 22) {
  return `<span class="wa-logo" style="width:${size}px;height:${size}px" aria-hidden="true">
    <svg viewBox="0 0 32 32" role="img">
      <path d="M16 3.5c-6.8 0-12.3 5.4-12.3 12.1 0 2.2.6 4.3 1.7 6.1L4 28.5l7-1.8c1.5.7 3.2 1.1 5 1.1 6.8 0 12.3-5.4 12.3-12.1S22.8 3.5 16 3.5Z" />
      <path class="wa-phone" d="M12.4 9.6c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.5 1.4-1.5 3.5s1.6 4.1 1.8 4.4c.2.3 3.1 4.8 7.6 6.5 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.5-1 2.9-2 .4-1 .4-1.8.3-2-.1-.2-.4-.3-.8-.5l-2.8-1.3c-.4-.2-.7-.2-1 .2l-1.2 1.5c-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-1.9-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.7-.8c.2-.2.3-.4.4-.7.1-.2.1-.5 0-.7l-1.3-2.9Z" />
    </svg>
  </span>`;
}

function render() {
  const app = document.querySelector("#app");
  if (!state.session) {
    app.innerHTML = renderLogin();
  } else if (state.session.role === "admin") {
    app.innerHTML = renderShell("admin", renderAdminPage());
  } else {
    const customer = getCurrentCustomer();
    if (!customer || !canUse(customer)) {
      app.innerHTML = renderExpired(customer);
    } else {
      app.innerHTML = renderShell("customer", renderCustomerPage(customer), customer);
    }
  }
  if (window.lucide) lucide.createIcons();
}

function renderLogin() {
  return `
    <main class="auth-shell">
      <section class="auth-visual">
        <div class="brand-mark"><span>${whatsappLogo(24)}</span> AutoMsg Elite</div>
        <div class="auth-copy">
          <h1>WhatsApp CRM for reselling, support and daily product posting.</h1>
          <p>Create customers, set trial or 6-month expiry, control every feature, and give each business its own customer portal.</p>
        </div>
        <div class="tiny">Admin can create IDs once. Customers log in with only the access you allow.</div>
      </section>
      <section class="auth-card-wrap">
        <form class="auth-card" onsubmit="login(event)">
          <h2>Sign in</h2>
          <p>Use admin or customer account.</p>
          <div class="field">
            <label>Username</label>
            <input id="username" autocomplete="username" required value="admin" />
          </div>
          <div class="field">
            <label>Password</label>
            <input id="password" type="password" autocomplete="current-password" required value="admin123" />
          </div>
          <button class="btn full" type="submit">${icon("log-in")} Login</button>
          <div class="demo-box">
            <strong>Demo login</strong><br />
            Admin: admin / admin123<br />
            Customer: customer / 123456
          </div>
        </form>
      </section>
    </main>
  `;
}

function renderShell(role, body, customer = null) {
  const allowed = role === "admin" ? navItems.map((n) => n.id) : customer.permissions;
  const quickItems = navItems.filter((item) => role === "admin" || allowed.includes(item.id));
  return `
    <div class="dashboard-shell ${drawerOpen ? "drawer-is-open" : ""}">
      <header class="dashboard-topbar">
        <div class="top-left">
          <button class="icon-btn" onclick="toggleDrawer()" onmouseenter="openDrawer()" title="Menu">${icon("menu", 18)}</button>
          <strong class="top-logo">${whatsappLogo(20)} AutoMsg Elite</strong>
        </div>
        <div class="top-tools">
          <label class="search-box"><input placeholder="Search" /><span>${icon("search", 15)}</span></label>
          <button class="icon-btn" title="Notifications">${icon("bell", 18)}</button>
          <button class="icon-btn" title="${role === "admin" ? "Owner Admin" : customer.owner}">${icon("user", 18)}</button>
          <button class="icon-btn" onclick="logout()" title="Logout">${icon("log-out", 18)}</button>
        </div>
      </header>
      <button class="drawer-backdrop" onclick="toggleDrawer()" aria-label="Close menu"></button>
      <div class="drawer-edge" onmouseenter="openDrawer()"></div>
      <aside class="slide-drawer" onmouseleave="closeDrawer()">
        <div class="drawer-head">
          <strong>${whatsappLogo(22)} AutoMsg Elite</strong>
          <button class="icon-btn" onclick="toggleDrawer()" title="Close">${icon("x", 18)}</button>
        </div>
        <div class="drawer-profile">
          <span>${icon(role === "admin" ? "shield-check" : "store", 20)}</span>
          <div>
            <strong>${role === "admin" ? "Admin Portal" : customer.business}</strong>
            <small>${role === "admin" ? "Owner dashboard" : `${daysLeft(customer.expiresAt)} days left`}</small>
          </div>
        </div>
        <nav class="drawer-nav">
          ${quickItems
            .map((item) => `<button class="${activePage === item.id ? "active" : ""}" onclick="goPage('${item.id}')">${icon(item.icon, 18)} <span>${item.label}</span></button>`)
            .join("")}
        </nav>
      </aside>
      <main class="dashboard-content">${body}</main>
    </div>
  `;
}

function renderAdminPage() {
  if (activePage !== "overview") return renderGenericAdmin(activePage);
  const total = state.customers.length;
  const active = state.customers.filter(canUse).length;
  const expiring = state.customers.filter((c) => canUse(c) && daysLeft(c.expiresAt) <= 7).length;
  const campaigns = state.customers.reduce((sum, c) => sum + c.campaigns.length, 0);
  const dashboard = {
    title: "Admin Dashboard",
    subtitle: "Customer control, expiry, access and WhatsApp CRM overview",
    followers: `${Math.max(4.5, total + 3.5).toFixed(1)}M`,
    visitors: `${(active + 6.25).toFixed(2)}M`,
    chats: `${Math.max(2, campaigns)}M`,
    users: state.customers
  };
  return renderAnalyticsDashboard(dashboard, true);
}

function renderAdminOverviewLegacy() {
  const total = state.customers.length;
  const active = state.customers.filter(canUse).length;
  const expiring = state.customers.filter((c) => canUse(c) && daysLeft(c.expiresAt) <= 7).length;
  const campaigns = state.customers.reduce((sum, c) => sum + c.campaigns.length, 0);
  return `
    <section class="section-head">
      <div>
        <h2>Overview</h2>
        <p>Overall customer, access and WhatsApp connection dashboard.</p>
      </div>
      <button class="btn" onclick="resetDemo()">${icon("refresh-cw")} Reset Demo</button>
    </section>

    <section class="grid cols-4">
      ${metric("Total Customers", total, "IDs created")}
      ${metric("Active Accounts", active, "Able to use portal")}
      ${metric("Expiring Soon", expiring, "Within 7 days")}
      ${metric("Campaigns", campaigns, "All customers")}
    </section>

    <section class="grid cols-2" style="margin-top:18px">
      <div class="panel">
        <div class="panel-title">
          <div><h2>WhatsApp QR</h2><p>Scan to activate WhatsApp session.</p></div>
          <button class="btn secondary" onclick="refreshQr()">${icon("rotate-cw")} QR Refresh</button>
        </div>
        <div class="qr-wrap">
          <div class="qr" data-seed="${state.qrSeed}"></div>
          <div>
            <strong>Session status: Ready to scan</strong>
            <p class="tiny">Use this quick QR for onboarding or reconnecting a customer device.</p>
          </div>
        </div>
      </div>
      <form class="panel" onsubmit="createCustomer(event)">
        <div class="panel-title">
          <div><h2>Create Customer</h2><p>Set ID, password, plan expiry and feature access.</p></div>
        </div>
        <div class="grid cols-2">
          ${field("Business Name", "business", "text", "Customer Shop", true)}
          ${field("Owner Name", "owner", "text", "Owner name", true)}
          ${field("Phone", "phone", "tel", "+91", true)}
          ${field("Email", "email", "email", "customer@example.com", false)}
          ${field("Login ID", "username", "text", "customerid", true)}
          ${field("Password", "password", "text", "123456", true)}
          <div class="field">
            <label>Plan</label>
            <select name="plan" onchange="syncExpiry(this.value)">
              <option value="7 Days Trial">7 Days Trial</option>
              <option value="6 Months">6 Months</option>
              <option value="Custom">Custom Date</option>
            </select>
          </div>
          ${field("Expiry Date", "expiresAt", "date", "", true, addDays(7))}
        </div>
        <div class="field">
          <label>Feature Access</label>
          <div class="permission-grid">
            ${navItems.map((n) => `<label class="check-card"><input type="checkbox" name="permissions" value="${n.id}" ${["overview", "connect", "messageBot", "campaigns", "chat", "cannedReply"].includes(n.id) ? "checked" : ""}> ${n.label}</label>`).join("")}
          </div>
        </div>
        <button class="btn full" type="submit">${icon("user-plus")} Create Customer ID</button>
      </form>
    </section>

    <section class="table-wrap" style="margin-top:18px">
      <table>
        <thead><tr><th>Business</th><th>Login</th><th>Plan</th><th>Expiry</th><th>Status</th><th>Access</th><th>Action</th></tr></thead>
        <tbody>
          ${state.customers.map(renderCustomerRow).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderGenericAdmin(page) {
  return `
    ${renderModuleFrame(page, null, "admin")}
  `;
}

function renderCustomerPage(customer) {
  if (!customer.permissions.includes(activePage)) activePage = customer.permissions[0] || "overview";
  if (activePage === "overview") return renderCustomerOverview(customer);
  return `
    ${renderModuleFrame(activePage, customer, "customer")}
  `;
}

function renderCustomerOverview(customer) {
  return renderAnalyticsDashboard({
    title: customer.business,
    subtitle: `Plan expires on ${formatDate(customer.expiresAt)} - ${daysLeft(customer.expiresAt)} days left`,
    followers: "4.5M",
    visitors: "6.25M",
    chats: "2M",
    users: [customer]
  }, false);
}

function renderAnalyticsDashboard(data, isAdmin) {
  return `
    <section class="dashboard-title">
      <div>
        <h1>${data.title}</h1>
        <p>${data.subtitle}</p>
      </div>
      <div class="actions">
        <button class="btn secondary" onclick="refreshQr()">${icon("rotate-cw")} WhatsApp QR</button>
        ${isAdmin ? `<button class="btn" onclick="resetDemo()">${icon("refresh-cw")} Reset Demo</button>` : ""}
      </div>
    </section>

    <section class="kpi-grid">
      ${dashboardCard("New Followers", data.followers, "+ 25% vs Last Month", "purple", "user-plus")}
      ${dashboardCard("Total Visitors", data.visitors, "+ 76% vs Last Month", "green-card", "users")}
      ${dashboardCard("Chat", data.chats, "+ 25% vs Last Month", "red-card", "message-square")}
      <article class="analytics-card">
        <div class="card-head"><strong>Analytics</strong><button>${icon("more-vertical", 16)}</button></div>
        <div class="donut"><span></span></div>
        <div class="legend"><i></i> Active <i class="completed"></i> Completed</div>
      </article>
    </section>

    <section class="dashboard-grid">
      <article class="chart-card growth-card">
        <div class="card-head">
          <strong>Growth</strong>
          <div class="actions"><button class="chip">2024 ${icon("chevron-down", 13)}</button><button class="chip">Download Report ${icon("download", 13)}</button></div>
        </div>
        <div class="bar-chart">
          ${[29, 22, 38, 39, 58, 92, 52, 72, 58].map((h, i) => `<div class="bar-col"><span class="${i === 5 ? "hot" : ""}" style="height:${h}%"></span><small>w-${i + 1}</small></div>`).join("")}
        </div>
      </article>

      <article class="chart-card overview-card">
        <div class="card-head"><strong>Overview</strong><button class="chip">View All</button></div>
        <div class="radar-wrap">
          <div class="radar-chart">
            <span class="point p1"></span><span class="point p2"></span><span class="point p3"></span><span class="point p4"></span><span class="point p5"></span>
          </div>
        </div>
      </article>

      <article class="chart-card active-card">
        <div class="card-head"><strong>Active Times</strong><div class="segmented"><button>Hours</button><button>Days</button></div></div>
        <div class="active-bars">${[48, 31, 48, 82, 64, 48, 58].map((h) => `<span style="height:${h}%"></span>`).join("")}</div>
      </article>

      <article class="chart-card user-card">
        <div class="card-head"><strong>${isAdmin ? "Customers" : "New Users"}</strong><button>${icon("search", 15)}</button></div>
        <div class="mini-table">
          <div class="mini-row head"><span>Users</span><span>Details</span><span>Status</span><span>Plan</span><span>Action</span></div>
          ${data.users.concat(defaultState.customers).slice(0, 4).map((u, i) => `<div class="mini-row">
            <span class="avatar-cell"><b>${u.owner.slice(0, 1)}</b><em>${u.owner}<small>${u.email}</small></em></span>
            <span>#${i + 1} Testing</span>
            <span><mark class="${canUse(u) ? "active" : "inactive"}">${canUse(u) ? "Active" : "Inactive"}</mark></span>
            <span>${u.plan}</span>
            <span class="row-actions"><button>${icon("edit-3", 13)}</button><button>${icon("trash-2", 13)}</button></span>
          </div>`).join("")}
        </div>
      </article>
    </section>

    ${isAdmin ? renderCompactCustomerCreator() : ""}
  `;
}

function dashboardCard(title, value, change, tone, iconName) {
  return `<article class="kpi-card ${tone}">
    <div class="kpi-icon">${icon(iconName, 20)}</div>
    <strong>${title}</strong>
    <h2>${value}</h2>
    <small>${change}</small>
    <div class="wave"></div>
  </article>`;
}

function renderCompactCustomerCreator() {
  return `
    <form class="chart-card compact-create" onsubmit="createCustomer(event)">
      <div class="card-head"><strong>Create Customer Login</strong><button class="chip" type="submit">${icon("user-plus", 14)} Create</button></div>
      <div class="compact-form">
        ${field("Business", "business", "text", "Customer Shop", true)}
        ${field("Owner", "owner", "text", "Owner name", true)}
        ${field("Phone", "phone", "tel", "+91", true)}
        ${field("Email", "email", "email", "customer@example.com", false)}
        ${field("Login ID", "username", "text", "customerid", true)}
        ${field("Password", "password", "text", "123456", true)}
        <div class="field"><label>Plan</label><select name="plan" onchange="syncExpiry(this.value)"><option value="7 Days Trial">7 Days Trial</option><option value="6 Months">6 Months</option><option value="Custom">Custom Date</option></select></div>
        ${field("Expiry", "expiresAt", "date", "", true, addDays(7))}
      </div>
      <div class="permission-grid compact-permissions">
        ${navItems.map((n) => `<label class="check-card"><input type="checkbox" name="permissions" value="${n.id}" ${["overview", "connect", "messageBot", "campaigns", "chat", "cannedReply"].includes(n.id) ? "checked" : ""}> ${n.label}</label>`).join("")}
      </div>
    </form>
  `;
}

function renderModuleFrame(page, customer, role) {
  const title = labelFor(page);
  return `
    <section class="workspace-head">
      <div>
        <span class="eyebrow">${role === "admin" ? "Admin Control" : "Customer Portal"}</span>
        <h1>${title}</h1>
        <p>${moduleDescription(page)}</p>
      </div>
      <div class="actions">
        <button class="btn secondary" onclick="refreshQr()">${icon("rotate-cw")} Refresh QR</button>
        <button class="btn" onclick="fakeSave(event)">${icon("save")} Save Changes</button>
      </div>
    </section>
    ${renderModuleStats(page)}
    <section class="module-board">${renderModuleContent(page, customer, role)}</section>
  `;
}

function renderModuleStats(page) {
  const stats = {
    connect: [
      ["Connected", "1/4", "channels active"],
      ["QR Health", "Live", "WhatsApp ready"],
      ["Daily Posts", "12", "across social"],
      ["Alerts", "2", "need attention"]
    ],
    messageBot: [
      ["Bot Replies", "428", "today"],
      ["Auto Resolve", "74%", "without human"],
      ["Open Queue", "36", "pending chats"],
      ["Avg Reply", "8s", "response time"]
    ],
    templateBot: [
      ["Flows", "9", "active"],
      ["Triggers", "24", "keywords"],
      ["Fallbacks", "3", "handover rules"],
      ["Success", "91%", "matched replies"]
    ],
    templates: [
      ["Approved", "18", "ready to send"],
      ["Pending", "4", "under review"],
      ["Categories", "6", "sales/support"],
      ["Usage", "1.8k", "this month"]
    ],
    campaigns: [
      ["Scheduled", "7", "next 24h"],
      ["Delivered", "12.4k", "this month"],
      ["Clicks", "1.1k", "tracked"],
      ["Revenue", "Rs 84k", "estimated"]
    ],
    bulkCampaigns: [
      ["Lists", "5", "audiences"],
      ["Contacts", "9.2k", "imported"],
      ["Queue", "3", "campaigns"],
      ["Opt-outs", "1.4%", "healthy"]
    ],
    activityLog: [
      ["Events", "132", "today"],
      ["QR Refresh", "6", "this week"],
      ["Admin Edits", "11", "tracked"],
      ["Errors", "0", "critical"]
    ],
    chat: [
      ["Inbox", "36", "open"],
      ["Assigned", "12", "to human"],
      ["Bot Closed", "241", "today"],
      ["SLA", "96%", "on time"]
    ],
    cannedReply: [
      ["Replies", "22", "saved"],
      ["Used", "389", "today"],
      ["Best Reply", "Price", "top usage"],
      ["Languages", "2", "enabled"]
    ],
    aiPrompts: [
      ["Prompts", "14", "saved"],
      ["Generated", "86", "today"],
      ["Products", "31", "with copy"],
      ["Tone", "Sales", "default"]
    ],
    settings: [
      ["Portal", "24/7", "monitoring"],
      ["Timezone", "IST", "active"],
      ["Expiry Lock", "On", "protected"],
      ["Backup", "Local", "storage"]
    ]
  }[page] || [];
  return `<section class="grid cols-4 module-stats">${stats.map(([a, b, c]) => metric(a, b, c)).join("")}</section>`;
}

function renderModuleContent(page, customer, role = "customer") {
  if (page === "connect") {
    const channels = ["whatsapp", "instagram", "facebook", "telegram"];
    return `
      <div class="grid cols-2">
        <div class="panel">
          <div class="panel-title"><div><h2>Connected Accounts</h2><p>Link social accounts for daily product posting.</p></div></div>
          <div class="feature-list">${channels.map((ch) => `<div class="feature-item"><strong>${icon(channelIcon(ch))} ${capitalize(ch)}</strong><span class="tiny">${ch === "whatsapp" ? "Messaging + automation" : "Daily product post"}</span><button class="toggle ${(customer?.connected?.[ch] ?? ch === "whatsapp") ? "on" : ""}" onclick="toggleChannel('${ch}')"><span></span></button></div>`).join("")}</div>
        </div>
        <div class="panel">
          <div class="panel-title"><div><h2>WhatsApp Scanner</h2><p>Refresh QR and reconnect any time.</p></div></div>
          <div class="qr-wrap">
            <div class="qr" data-seed="${state.qrSeed}"></div>
            <div><strong>Session ready</strong><p class="tiny">Scan from WhatsApp linked devices. If portal is closed, reconnect from here.</p><button class="btn secondary" onclick="refreshQr()">${icon("rotate-cw")} Refresh QR</button></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><div><h2>Posting Schedule</h2><p>Use connected accounts to publish product posts.</p></div></div>
        <div class="timeline">${["10:00 AM - WhatsApp offer broadcast", "01:30 PM - Instagram product post", "05:00 PM - Facebook shop update", "08:00 PM - Telegram deal alert"].map((x) => `<div class="timeline-row"><span></span><strong>${x}</strong><em>Ready</em></div>`).join("")}</div>
      </div>`;
  }
  if (page === "messageBot") {
    return `
      <div class="bot-layout">
        <div class="panel">
          <div class="panel-title"><div><h2>Live Reply Rules</h2><p>Customer chat-e instant auto-reply control.</p></div><span class="badge">Live</span></div>
          <div class="feature-list">
            ${["Welcome message", "Price question", "Delivery question", "Order tracking", "Human handover"].map((x, i) => `<div class="feature-item"><strong>${icon(i === 4 ? "user-round-check" : "message-circle")} ${x}</strong><span class="tiny">${i === 4 ? "after 2 failed replies" : "keyword based"}</span><button class="toggle on"><span></span></button></div>`).join("")}
          </div>
        </div>
        <form class="panel" onsubmit="fakeSave(event)">
          <div class="panel-title"><div><h2>Auto Reply Builder</h2><p>Keyword, intent and bot answer preview.</p></div></div>
          <div class="grid cols-2">
            <div class="field"><label>Customer Says</label><input value="price koto / delivery kobe" /></div>
            <div class="field"><label>Reply Type</label><select><option>Instant text reply</option><option>Ask next question</option><option>Send to human</option></select></div>
          </div>
          <div class="field"><label>Bot Reply</label><textarea>Hi, price details sent. Please share size/color and delivery city so we can confirm your order.</textarea></div>
          <div class="preview-message"><strong>Live Preview</strong><p>Customer message match hole bot eta immediately chat-e pathabe.</p></div>
          <button class="btn" type="submit">${icon("save")} Save Reply Rule</button>
        </form>
      </div>
      <div class="chat-workspace">
        <div class="panel conversation-list">
          ${["Price intent detected", "Delivery intent detected", "Payment intent detected"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${icon("zap")} <span>${x}</span><em>${92 - i * 11}%</em></button>`).join("")}
        </div>
        <div class="panel">
          <div class="panel-title"><div><h2>Bot Test Chat</h2><p>Rule save korar age ekhane test koro.</p></div></div>
          <div class="chat-box">
            <div class="bubble">price koto?</div>
            <div class="bubble me">Hi, price details sent. Please share size/color and delivery city.</div>
          </div>
        </div>
      </div>`;
  }
  if (page === "templateBot") {
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="fakeSave(event)">
          <div class="panel-title"><div><h2>Template Flow Builder</h2><p>Approved template diye automatic sequence banan.</p></div><span class="badge warn">Approval Based</span></div>
          <div class="grid cols-2">
            <div class="field"><label>Flow Name</label><input value="Order follow-up flow" /></div>
            <div class="field"><label>Start Trigger</label><select><option>Order confirmed</option><option>Payment pending</option><option>Delivery shipped</option></select></div>
            <div class="field"><label>Delay</label><select><option>Immediately</option><option>After 2 hours</option><option>After 1 day</option></select></div>
            <div class="field"><label>Template</label><select><option>Order Confirmation</option><option>Payment Reminder</option><option>Delivery Update</option></select></div>
          </div>
          <div class="field"><label>Template Variables</label><textarea>{{name}}, {{order_id}}, {{amount}}, {{tracking_link}}</textarea></div>
          <button class="btn" type="submit">${icon("save")} Save Flow</button>
        </form>
        <div class="panel">
          <div class="panel-title"><div><h2>Approval Queue</h2><p>WhatsApp template status track korun.</p></div></div>
          <div class="feature-list">
            ${["Order Confirmation - Approved", "Payment Reminder - Pending", "Delivery Update - Approved", "Review Request - Draft"].map((x, i) => `<div class="feature-item"><strong>${icon("scroll-text")} ${x}</strong><span class="badge ${i === 1 ? "warn" : i === 3 ? "off" : ""}">${i === 1 ? "Pending" : i === 3 ? "Draft" : "Ready"}</span></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Step</th><th>Trigger</th><th>Template</th><th>Delay</th><th>Status</th></tr></thead><tbody>
        <tr><td>1</td><td>Order Created</td><td>Order Confirmation</td><td>Immediately</td><td><span class="badge">Ready</span></td></tr>
        <tr><td>2</td><td>Payment Not Done</td><td>Payment Reminder</td><td>After 2 hours</td><td><span class="badge warn">Pending</span></td></tr>
        <tr><td>3</td><td>Shipped</td><td>Delivery Update</td><td>Same day</td><td><span class="badge">Ready</span></td></tr>
      </tbody></table></div>`;
  }
  if (page === "campaigns" || page === "bulkCampaigns") {
    const rows = customer?.campaigns || defaultState.customers[0].campaigns;
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="fakeSave(event)">
          <div class="panel-title"><div><h2>${page === "bulkCampaigns" ? "Bulk Sender" : "Campaign Builder"}</h2><p>Create product offer and schedule sending.</p></div></div>
          <div class="grid cols-2">
            ${field("Campaign Name", "campaignName", "text", "Eid offer")}
            <div class="field"><label>Channel</label><select><option>WhatsApp</option><option>Instagram</option><option>Facebook</option><option>Telegram</option></select></div>
            ${field("Audience", "audience", "text", page === "bulkCampaigns" ? "All customers / CSV list" : "New buyers")}
            ${field("Schedule Date", "schedule", "date", "", false, today())}
          </div>
          <div class="field"><label>Message</label><textarea>New product available today. Reply YES for price and delivery details.</textarea></div>
          <button class="btn" type="submit">${icon("calendar-plus")} Schedule Campaign</button>
        </form>
        <div class="panel">
          <div class="panel-title"><div><h2>Delivery Preview</h2><p>Expected reach before sending.</p></div></div>
          <div class="progress-list">
            ${progress("WhatsApp", 84)}
            ${progress("Instagram", 62)}
            ${progress("Facebook", 51)}
            ${progress("Telegram", 73)}
          </div>
        </div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Name</th><th>Channel</th><th>Status</th><th>Date</th><th>Result</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r.title}</td><td>${r.channel}</td><td><span class="badge warn">${r.status}</span></td><td>${formatDate(r.date)}</td><td>82% delivered</td></tr>`).join("")}</tbody></table></div>`;
  }
  if (page === "chat") {
    return `
      <div class="chat-workspace">
        <div class="panel conversation-list">
          ${["Priya - price query", "Arif - delivery update", "Mina - payment sent", "Rakesh - exchange request"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${icon("message-circle")} <span>${x}</span><em>${i + 2}m</em></button>`).join("")}
        </div>
        <div class="panel">
          <div class="panel-title"><div><h2>Live Chat</h2><p>Bot reply and human handover preview.</p></div><span class="badge">Bot Active</span></div>
          <div class="chat-box">
            <div class="bubble">Hi, product price koto?</div>
            <div class="bubble me">Hello! Price details sent. Kon size/color lagbe bolun.</div>
            <div class="bubble">Delivery kobe pabo?</div>
            <div class="bubble me">Order confirm hole 2-4 working days.</div>
          </div>
          <div class="composer"><input placeholder="Type message..." /><button class="btn">${icon("send")} Send</button></div>
        </div>
      </div>
      `;
  }
  if (page === "cannedReply") {
    const replies = customer?.replies || defaultState.customers[0].replies;
    return `<div class="grid cols-2"><div class="panel"><div class="panel-title"><div><h2>Saved Replies</h2><p>Fast answers for support team.</p></div></div><div class="feature-list">${replies.map((r) => `<div class="feature-item"><strong>${icon("message-square-text")} ${r}</strong><button class="btn secondary">${icon("copy", 16)}</button></div>`).join("")}</div></div><form class="panel" onsubmit="addReply(event)"><div class="panel-title"><div><h2>Add Reply</h2><p>Create a reusable support response.</p></div></div><div class="field"><label>Shortcut</label><input placeholder="/price" /></div><div class="field"><label>Reply Text</label><textarea name="reply" placeholder="Add canned reply..."></textarea></div><button class="btn">${icon("plus")} Add Reply</button></form></div>`;
  }
  if (page === "templates") {
    return `<div class="grid cols-3">${["Order Confirmation", "Payment Reminder", "Delivery Update", "COD Confirmation", "Welcome Offer", "Review Request"].map((x, i) => `<article class="template-card"><span class="badge ${i % 2 ? "warn" : ""}">${i % 2 ? "Pending" : "Approved"}</span><strong>${x}</strong><p>Hi {{name}}, your ${x.toLowerCase()} message is ready for WhatsApp automation.</p><div class="actions"><button class="btn secondary">${icon("edit-3")} Edit</button><button class="btn secondary">${icon("copy")} Copy</button></div></article>`).join("")}</div>`;
  }
  if (page === "activityLog") {
    const logs = customer?.logs || defaultState.customers[0].logs;
    return `<div class="panel"><div class="panel-title"><div><h2>Activity Timeline</h2><p>All QR, campaign, template and admin events.</p></div><button class="btn secondary">${icon("download")} Export</button></div><div class="timeline">${logs.concat(["Customer login successful", "Campaign queue checked", "24/7 portal heartbeat active"]).map((l, i) => `<div class="timeline-row"><span></span><strong>${l}</strong><em>${i + 1}h ago</em></div>`).join("")}</div></div>`;
  }
  if (page === "aiPrompts") {
    return `<div class="grid cols-2"><form class="panel" onsubmit="fakeSave(event)"><div class="panel-title"><div><h2>Prompt Generator</h2><p>Create product sales copy for channels.</p></div></div><div class="grid cols-2"><div class="field"><label>Product</label><input value="Premium cotton kurti" /></div><div class="field"><label>Tone</label><select><option>Friendly sales</option><option>Luxury</option><option>Urgent offer</option></select></div></div><div class="field"><label>AI Sales Prompt</label><textarea>Write a short product sales message with price, offer, CTA and friendly Bengali tone.</textarea></div><button class="btn">${icon("sparkles")} Generate & Save</button></form><div class="panel"><div class="panel-title"><div><h2>Generated Preview</h2><p>Ready to post after editing.</p></div></div><div class="preview-message"><strong>New arrival!</strong><p>Premium cotton kurti now available. Limited stock, COD available. Reply YES for price, size and delivery details.</p></div></div></div>`;
  }
  if (page === "settings") {
    return `<div class="grid cols-2"><div class="panel"><div class="panel-title"><div><h2>Portal Settings</h2><p>Expiry, timezone and alert controls.</p></div></div><div class="field"><label>Timezone</label><select><option>Asia/Kolkata</option><option>Asia/Dhaka</option></select></div><div class="field"><label>24/7 Portal Alert</label><select><option>WhatsApp alert when disconnected</option><option>Email only</option></select></div><div class="field"><label>Expiry Protection</label><select><option>Lock after expiry date</option><option>Warn only</option></select></div><button class="btn" onclick="toast('Settings saved')">${icon("save")} Save Settings</button></div><div class="panel"><div class="panel-title"><div><h2>Access Summary</h2><p>What this customer can use.</p></div></div><div class="feature-list">${(customer?.permissions || navItems.map((x) => x.id)).map((p) => `<div class="feature-item"><strong>${icon("shield-check")} ${labelFor(p)}</strong><span class="badge">Allowed</span></div>`).join("")}</div></div></div>`;
  }
  return `<div class="empty">This module is ready for your workflow.</div>`;
}

function metric(label, value, sub) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong><small>${sub}</small></div>`;
}

function field(label, name, type, placeholder, required = false, value = "") {
  return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" placeholder="${placeholder}" ${required ? "required" : ""} value="${value}" /></div>`;
}

function progress(label, value) {
  return `<div class="progress-row"><div><strong>${label}</strong><span>${value}% ready</span></div><div class="progress-track"><i style="width:${value}%"></i></div></div>`;
}

function renderCustomerRow(c) {
  const usable = canUse(c);
  return `<tr>
    <td><strong>${c.business}</strong><div class="tiny">${c.owner} - ${c.phone}</div></td>
    <td>${c.username}<div class="tiny">${c.password}</div></td>
    <td>${c.plan}</td>
    <td>${formatDate(c.expiresAt)}</td>
    <td><span class="badge ${usable ? "" : "off"}">${usable ? "Active" : "Expired"}</span></td>
    <td>${c.permissions.length} modules</td>
    <td class="actions"><button class="btn secondary" onclick="extendCustomer('${c.id}', 7)">${icon("plus", 16)} 7d</button><button class="btn secondary" onclick="extendCustomer('${c.id}', 180)">${icon("calendar", 16)} 6m</button><button class="btn danger" onclick="deleteCustomer('${c.id}')">${icon("trash-2", 16)}</button></td>
  </tr>`;
}

function login(event) {
  event.preventDefault();
  const username = event.target.username.value.trim();
  const password = event.target.password.value.trim();
  if (username === "admin" && password === "admin123") {
    state.session = { role: "admin" };
    activePage = "overview";
    saveState();
    render();
    return;
  }
  const customer = state.customers.find((c) => c.username === username && c.password === password);
  if (!customer) return toast("Wrong login ID or password");
  state.session = { role: "customer", customerId: customer.id };
  activePage = "overview";
  saveState();
  render();
}

function logout() {
  state.session = null;
  saveState();
  render();
}

function createCustomer(event) {
  event.preventDefault();
  const form = event.target;
  const permissions = [...form.querySelectorAll('input[name="permissions"]:checked')].map((x) => x.value);
  if (state.customers.some((c) => c.username === form.username.value.trim())) return toast("This login ID already exists");
  state.customers.unshift({
    id: `cust_${Date.now()}`,
    business: form.business.value.trim(),
    owner: form.owner.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    username: form.username.value.trim(),
    password: form.password.value.trim(),
    plan: form.plan.value,
    expiresAt: form.expiresAt.value,
    active: true,
    permissions,
    connected: { whatsapp: false, instagram: false, facebook: false, telegram: false },
    campaigns: [],
    replies: ["Hello, thanks for contacting us.", "Please share product name and quantity."],
    logs: ["Customer account created"]
  });
  saveState();
  form.reset();
  toast("Customer ID created");
  render();
}

function syncExpiry(plan) {
  const input = document.querySelector('input[name="expiresAt"]');
  if (!input) return;
  if (plan === "7 Days Trial") input.value = addDays(7);
  if (plan === "6 Months") input.value = addDays(180);
}

function extendCustomer(id, days) {
  const c = state.customers.find((x) => x.id === id);
  if (!c) return;
  c.expiresAt = addDays(days);
  c.plan = days >= 180 ? "6 Months" : "7 Days Trial";
  c.active = true;
  c.logs.unshift(`Plan extended by admin for ${days} days`);
  saveState();
  render();
}

function deleteCustomer(id) {
  state.customers = state.customers.filter((c) => c.id !== id);
  saveState();
  render();
}

function refreshQr() {
  state.qrSeed = (state.qrSeed + 1) % 3;
  saveState();
  render();
  toast("WhatsApp QR refreshed");
}

function goPage(page) {
  activePage = page;
  drawerOpen = false;
  render();
}

function toggleDrawer() {
  drawerOpen = !drawerOpen;
  render();
}

function openDrawer() {
  if (drawerOpen) return;
  drawerOpen = true;
  render();
}

function closeDrawer() {
  if (!drawerOpen) return;
  drawerOpen = false;
  render();
}

function toggleChannel(ch) {
  const c = getCurrentCustomer();
  if (c) c.connected[ch] = !c.connected[ch];
  saveState();
  render();
}

function addReply(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  const value = event.target.reply.value.trim();
  if (c && value) c.replies.unshift(value);
  saveState();
  render();
}

function fakeSave(event) {
  event.preventDefault();
  toast("Saved");
}

function resetDemo() {
  state = structuredClone(defaultState);
  state.session = { role: "admin" };
  activePage = "overview";
  saveState();
  render();
}

function getCurrentCustomer() {
  return state.customers.find((c) => c.id === state.session?.customerId);
}

function canUse(customer) {
  const expiry = new Date(`${customer.expiresAt}T23:59:59`);
  return customer.active && expiry >= new Date();
}

function daysLeft(date) {
  const diff = new Date(`${date}T23:59:59`) - new Date();
  return Math.max(0, Math.ceil(diff / 86400000));
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function labelFor(id) {
  return navItems.find((n) => n.id === id)?.label || "Module";
}

function moduleDescription(id) {
  const map = {
    connect: "Connect WhatsApp, Instagram, Facebook and Telegram accounts.",
    messageBot: "Configure automatic replies and 24/7 customer support.",
    templateBot: "Create approved template flows for common questions.",
    templates: "Manage reusable WhatsApp message templates.",
    campaigns: "Schedule daily product posts and offers.",
    bulkCampaigns: "Send bulk campaigns to selected customer lists.",
    activityLog: "Track actions, QR events, sends and changes.",
    chat: "Reply to customer conversations.",
    cannedReply: "Save quick replies for fast support.",
    aiPrompts: "Prepare AI prompts for product sales copy.",
    settings: "Manage alerts, timezone and portal preferences."
  };
  return map[id] || "Manage this module.";
}

function channelIcon(ch) {
  return { whatsapp: "message-circle", instagram: "instagram", facebook: "facebook", telegram: "send" }[ch] || "link";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toast(message) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const div = document.createElement("div");
  div.className = "toast";
  div.textContent = message;
  Object.assign(div.style, {
    position: "fixed",
    right: "18px",
    bottom: "18px",
    zIndex: 20,
    background: "#122033",
    color: "white",
    padding: "12px 14px",
    borderRadius: "8px",
    boxShadow: "0 14px 30px rgba(15,23,42,.22)",
    fontWeight: "800"
  });
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2200);
}

function renderExpired(customer) {
  return `
    <main class="expired-screen">
      <section class="panel">
        <h2>Account expired</h2>
        <p>${customer ? `${customer.business} expired on ${formatDate(customer.expiresAt)}.` : "This customer account is not available."}</p>
        <p class="tiny">Please contact admin to renew 7 days trial, 6 months plan or custom date access.</p>
        <button class="btn" onclick="logout()">${icon("arrow-left")} Back to Login</button>
      </section>
    </main>
  `;
}

render();
