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
      logs: ["WhatsApp QR connected", "Template approved: Order Confirmation", "Campaign created: New arrivals broadcast"],
      botRules: [
        { id: "rule_1", trigger: "price / price koto / koto", type: "Instant text reply", reply: "Hi, product detail: Premium cotton kurti, price regular 1200/- but offer price 850/- single. Color blue, green, red and yellow. Size 38 to 44 available. Delivery charge cash-on-delivery inside Dhaka 80/- and outside Dhaka 150/-. Confirm korte name, address & phone share koro.", active: true },
        { id: "rule_2", trigger: "delivery / kobe / tracking", type: "Instant text reply", reply: "Hi, order confirm hole normal delivery time Dhaka city-r vore 2-3 din, and outside Dhaka city city-r vore 3-5 din lagbe. Apnar delivery area-ti confirm korun.", active: true },
        { id: "rule_3", trigger: "hi / hello / hey / halo", type: "Instant text reply", reply: "Hello! Welcome to Demo Fashion Store. Delivery update, product details ba customer support er jonne niche select koro ba inquiry type koro. Amader support agent short time e respond korbe.", active: true }
      ],
      templateFlows: [
        { id: "flow_1", name: "Order Confirmation Flow", trigger: "Order confirmed", delay: "Immediately", template: "Order Confirmation", status: "Ready" },
        { id: "flow_2", name: "Abandoned Cart Reminder", trigger: "Payment pending", delay: "After 2 hours", template: "Payment Reminder", status: "Ready" }
      ],
      customTemplates: [
        { id: "tmpl_1", name: "Order Confirmation", body: "Hi {{name}}, your order #{{order_id}} for {{amount}} has been confirmed. Thank you for shopping with us! Track order: {{tracking_link}}", status: "Approved" },
        { id: "tmpl_2", name: "Payment Reminder", body: "Dear {{name}}, this is a friendly reminder that payment of {{amount}} is pending for order #{{order_id}}. Kindly complete it here: {{payment_link}}", status: "Pending" },
        { id: "tmpl_3", name: "Delivery Update", body: "Good news {{name}}! Your package from {{business}} has been shipped and is on its way. Tracking number is {{tracking_id}}.", status: "Approved" }
      ],
      chats: [
        {
          id: "chat_1",
          name: "Priya Rahman",
          phone: "+880 1711-223344",
          query: "price query",
          messages: [
            { sender: "customer", text: "price koto aitar?", time: "11:32 AM" },
            { sender: "bot", text: "Hi, product detail: Premium cotton kurti, price regular 1200/- but offer price 850/- single. Color blue, green, red and yellow. Size 38 to 44 available. Delivery charge cash-on-delivery inside Dhaka 80/- and outside Dhaka 150/-. Confirm korte name, address & phone share koro.", time: "11:32 AM" },
            { sender: "customer", text: "Acha green color size 40 hobe ready?", time: "11:33 AM" }
          ],
          time: "2m",
          unread: true,
          active: true,
          agentMode: "bot"
        },
        {
          id: "chat_2",
          name: "Arif Islam",
          phone: "+880 1819-334455",
          query: "delivery update",
          messages: [
            { sender: "customer", text: "Amar order-ta ki pathano hoyeche?", time: "10:15 AM" },
            { sender: "bot", text: "Hi, order confirm hole normal delivery time Dhaka city-r vore 2-3 din, and outside Dhaka city city-r vore 3-5 din lagbe. Apnar delivery area-ti confirm korun.", time: "10:15 AM" },
            { sender: "customer", text: "Dhaka Mirpur-12 block C", time: "10:17 AM" }
          ],
          time: "15m",
          unread: false,
          active: false,
          agentMode: "bot"
        },
        {
          id: "chat_3",
          name: "Mina Chowdhury",
          phone: "+880 1912-998877",
          query: "payment sent",
          messages: [
            { sender: "customer", text: "Bhaiya bkash numbers eta active? Payment korechi check koren.", time: "Yesterday" },
            { sender: "agent", text: "Yes ma'am, active. Transaction details payechi, aponar order process kora hocche.", time: "Yesterday" }
      ],
          time: "1d",
          unread: false,
          active: false,
          agentMode: "human"
        }
      ],
      aiPrompts: [
        { id: "ai_1", product: "Premium Cotton Kurti", tone: "Friendly sales", copy: "✨ New Arrival alert! ✨\nপ্রিয় আপুরা, চমৎকার ডিজাইনের Premium Cotton Kurti এখন স্টক-এ! অত্যন্ত আরামদায়ক এবং সফট কটন ফ্যাব্রিক দিয়ে তৈরি।\n🌸 সাইজ: ৩৮-৪৪ পর্যন্ত উপলব্ধ।\n💰 অফার প্রাইজ: মাত্র ৮৫০/- টাকা (রেগুলার ১২০০/-)\n🚚 সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা!\nঅর্ডার করতে এখনি ইনবক্স করুন অথবা কমেন্ট-এ YES লিখে জানান! 🛍️" }
      ],
      postingSchedule: [
        { id: "sch_1", time: "10:00 AM", task: "WhatsApp offer broadcast", status: "Completed" },
        { id: "sch_2", time: "01:30 PM", task: "Instagram product post", status: "Pending" },
        { id: "sch_3", time: "05:00 PM", task: "Facebook shop update", status: "Pending" }
      ],
      settings: {
        timezone: "Asia/Dhaka",
        alertMethod: "WhatsApp alert when disconnected",
        expiryProtection: "Lock after expiry date"
      },
      triggerOptions: ["Order confirmed", "Payment pending", "Delivery shipped"],
      delayOptions: ["Immediately", "After 2 hours", "After 1 day"]
    }
  ]
};

let state = loadState();
let activePage = "overview";
let drawerOpen = false;
let editingCustomerId = null;
let activeChatId = "chat_1";
let searchQuery = "";
let notificationsOpen = false;
let notifications = [
  { id: "n_1", text: "New customer Demo Fashion Store created", time: "1h ago", read: false },
  { id: "n_2", text: "WhatsApp session connected successfully", time: "2h ago", read: true },
  { id: "n_3", text: "Campaign 'New arrivals' sent to 82 contacts", time: "3h ago", read: true }
];
let testChatMessages = [
  { sender: "customer", text: "price koto aitar?" },
  { sender: "bot", text: "Hi, product detail: Premium cotton kurti, price regular 1200/- but offer price 850/- single. Color blue, green, red and yellow. Size 38 to 44 available. Confirm korte name, address & phone share koro." }
];
let isBotTyping = false;
let isLiveChatTyping = false;
let showCannedDropdown = false;

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
  let parsedState;
  if (!saved) {
    parsedState = structuredClone(defaultState);
  } else {
    try {
      parsedState = { ...structuredClone(defaultState), ...JSON.parse(saved) };
    } catch {
      parsedState = structuredClone(defaultState);
    }
  }
  // Backfill missing fields in customers to prevent undefined errors
  if (parsedState.customers && Array.isArray(parsedState.customers)) {
    parsedState.customers.forEach((c) => {
      const def = defaultState.customers[0];
      if (!c.botRules) c.botRules = structuredClone(def.botRules);
      if (!c.templateFlows) c.templateFlows = structuredClone(def.templateFlows);
      if (!c.customTemplates) c.customTemplates = structuredClone(def.customTemplates);
      if (!c.chats) c.chats = structuredClone(def.chats);
      if (!c.aiPrompts) c.aiPrompts = structuredClone(def.aiPrompts);
      if (!c.postingSchedule) c.postingSchedule = structuredClone(def.postingSchedule);
      if (!c.settings) c.settings = structuredClone(def.settings);
      if (!c.connected) c.connected = structuredClone(def.connected);
      if (!c.campaigns) c.campaigns = structuredClone(def.campaigns);
      if (!c.replies) c.replies = structuredClone(def.replies);
      if (!c.logs) c.logs = structuredClone(def.logs);
      if (!c.triggerOptions) c.triggerOptions = structuredClone(def.triggerOptions);
      if (!c.delayOptions) c.delayOptions = structuredClone(def.delayOptions);
    });
  }
  return parsedState;
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
          <label class="search-box"><input placeholder="Search..." value="${searchQuery}" oninput="handleSearch(this.value)" /><span>${icon("search", 15)}</span></label>
          <div style="position:relative; display:inline-block;">
            <button class="icon-btn" onclick="toggleNotifications()" title="Notifications" style="position:relative;">
              ${icon("bell", 18)}
              ${notifications.some(n => !n.read) ? `<span style="position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;background:var(--danger);"></span>` : ""}
            </button>
            ${notificationsOpen ? `
              <div class="panel notifications-popup" style="position:absolute; right:0; top:42px; width:280px; z-index:25; box-shadow:var(--shadow); padding:12px; background:white; border: 1px solid var(--line); border-radius:8px; display:block;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--line); padding-bottom:6px;">
                  <strong style="font-size:13px; color:var(--ink);">Recent Alerts</strong>
                  <button onclick="markAllNotificationsRead(event)" style="border:0; background:transparent; color:var(--blue); font-size:11px; font-weight:700; cursor:pointer;">Mark Read</button>
                </div>
                <div style="display:grid; gap:8px; max-height:220px; overflow-y:auto; scrollbar-width:thin;">
                  ${notifications.map(n => `
                    <div style="font-size:12px; padding:6px; border-radius:4px; background:${n.read ? 'transparent' : '#f0f6ff'}; border-left: 3px solid ${n.read ? 'transparent' : 'var(--brand)'}; text-align:left;">
                      <p style="margin:0; font-weight: ${n.read ? '700' : '400'}; color:var(--ink);">${n.text}</p>
                      <small style="color:var(--muted); font-size:10px;">${n.time}</small>
                    </div>
                  `).join("")}
                  ${notifications.length === 0 ? `<div style="text-align:center; padding:12px; font-size:12px; color:var(--muted);">No alerts.</div>` : ""}
                </div>
              </div>
            ` : ""}
          </div>
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
          <div class="qr-box" style="position:relative; width:136px; height:136px; background: white; border: 8px solid white; outline: 1px solid var(--line); border-radius: 8px; display:grid; place-items:center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/settings/linked-devices?seed=${state.qrSeed}" style="width:120px; height:120px; display:block;" alt="WhatsApp Web QR Code" />
          </div>
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

      <article class="chart-card user-card">
        <div class="card-head"><strong>${isAdmin ? "Customers" : "Active Leads"}</strong><button>${icon("search", 15)}</button></div>
        <div class="mini-table">
          <div class="mini-row head"><span>Users</span><span>Details</span><span>Status</span><span>Plan</span><span>Action</span></div>
          ${(isAdmin 
            ? (searchQuery.trim() !== "" 
                ? state.customers.filter(u => 
                    u.business.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    u.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase())
                  ) 
                : state.customers)
            : [
                { owner: "Priya Rahman", email: "priya@automsg.local", plan: "WhatsApp Chat", expiresAt: today(), active: true, id: "chat_1" },
                { owner: "Arif Islam", email: "arif@automsg.local", plan: "Instagram Direct", expiresAt: today(), active: true, id: "chat_2" },
                { owner: "Mina Chowdhury", email: "mina@automsg.local", plan: "Facebook Messenger", expiresAt: today(), active: true, id: "chat_3" }
              ]
          ).map((u, i) => `<div class="mini-row">
            <span class="avatar-cell"><b>${u.owner.slice(0, 1)}</b><em>${u.owner}<small>${u.email}</small></em></span>
            <span>#${i + 1} ${isAdmin ? `${u.business}<br><small style="color:var(--muted); font-size:10px; font-weight:700;">ID: <b style="color:var(--brand);">${u.username}</b> | Pass: <b>${u.password}</b></small>` : 'Lead Connection'}</span>
            <span><mark class="${canUse(u) ? "active" : "inactive"}">${canUse(u) ? "Active" : "Inactive"}</mark></span>
            <span>${u.plan}</span>
            <span class="row-actions">
              ${isAdmin 
                ? `<button onclick="startEditCustomer('${u.id}')" title="Edit Customer">${icon("edit-3", 13)}</button>
                   <button onclick="deleteCustomer('${u.id}')" title="Delete Customer">${icon("trash-2", 13)}</button>`
                : `<button onclick="goPage('chat'); activeChatId = '${u.id}'; render();" title="Open Chat" style="color:#059669;background:#d1fae5;">${icon("message-square", 13)}</button>`
              }
            </span>
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
  const isEditing = editingCustomerId !== null;
  const cust = isEditing ? state.customers.find(c => c.id === editingCustomerId) : null;
  return `
    <form class="chart-card compact-create" onsubmit="${isEditing ? 'saveCustomerEdit(event)' : 'createCustomer(event)'}">
      <div class="card-head">
        <strong>${isEditing ? `Edit Customer ID: ${cust.business}` : 'Create Customer Login'}</strong>
        <div class="actions">
          ${isEditing ? `<button class="chip secondary" type="button" onclick="cancelEditCustomer()">${icon("x", 14)} Cancel</button>` : ""}
          <button class="chip" type="submit">${icon(isEditing ? "save" : "user-plus", 14)} ${isEditing ? 'Save' : 'Create'}</button>
        </div>
      </div>
      <div class="compact-form">
        ${field("Business", "business", "text", "Customer Shop", true, cust ? cust.business : "")}
        ${field("Owner", "owner", "text", "Owner name", true, cust ? cust.owner : "")}
        ${field("Phone", "phone", "tel", "+91", true, cust ? cust.phone : "")}
        ${field("Email", "email", "email", "customer@example.com", false, cust ? cust.email : "")}
        ${field("Login ID", "username", "text", "customerid", true, cust ? cust.username : "")}
        ${field("Password", "password", "text", "123456", true, cust ? cust.password : "")}
        <div class="field">
          <label>Plan</label>
          <select name="plan" onchange="syncExpiry(this.value)">
            <option value="7 Days Trial" ${cust && cust.plan === "7 Days Trial" ? "selected" : ""}>7 Days Trial</option>
            <option value="6 Months" ${cust && cust.plan === "6 Months" ? "selected" : ""}>6 Months</option>
            <option value="Custom" ${cust && cust.plan === "Custom" ? "selected" : ""}>Custom Date</option>
          </select>
        </div>
        ${field("Expiry", "expiresAt", "date", "", true, cust ? cust.expiresAt : addDays(7))}
      </div>
      <div class="permission-grid compact-permissions">
        ${navItems.map((n) => {
          const checked = cust ? cust.permissions.includes(n.id) : ["overview", "connect", "messageBot", "campaigns", "chat", "cannedReply"].includes(n.id);
          return `<label class="check-card"><input type="checkbox" name="permissions" value="${n.id}" ${checked ? "checked" : ""}> ${n.label}</label>`;
        }).join("")}
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
    const schedule = customer?.postingSchedule || [];
    
    const getConnected = (ch) => {
      if (customer) return customer.connected?.[ch] ?? false;
      if (role === "admin") {
        if (!state.adminConnected) state.adminConnected = { whatsapp: true, instagram: false, facebook: false, telegram: false };
        return state.adminConnected[ch] ?? false;
      }
      return false;
    };

    return `
      <div class="grid cols-2">
        <div class="panel">
          <div class="panel-title"><div><h2>Connected Accounts</h2><p>Link social accounts for daily product posting.</p></div></div>
          <div class="feature-list">${channels.map((ch) => `<div class="feature-item"><strong>${icon(channelIcon(ch))} ${capitalize(ch)}</strong><span class="tiny">
            ${ch === "whatsapp" ? `Messaging: ${customer ? customer.phone : 'Gateway'}` : 
              ch === "instagram" ? `Posting: ${customer?.instaHandle || '@insta_shop'}` :
              ch === "facebook" ? `Branding: ${customer?.fbPage || 'FB Page'}` : 'Daily product post'
            }
          </span><button class="toggle ${getConnected(ch) ? "on" : ""}" onclick="toggleChannel('${ch}')"><span></span></button></div>`).join("")}</div>
        </div>
        <div class="panel">
          <div class="panel-title"><div><h2>WhatsApp Scanner</h2><p>Refresh QR and reconnect any time.</p></div></div>
          <div class="qr-wrap">
            <div class="qr-box" style="position:relative; width:136px; height:136px; background: white; border: 8px solid white; outline: 1px solid var(--line); border-radius: 8px; display:grid; place-items:center;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/settings/linked-devices?seed=${state.qrSeed}" style="width:120px; height:120px; display:block;" alt="WhatsApp Web QR Code" />
            </div>
            <div><strong>Session ready</strong><p class="tiny">Scan from WhatsApp linked devices. If portal is closed, reconnect from here.</p><button class="btn secondary" onclick="refreshQr()">${icon("rotate-cw")} Refresh QR</button></div>
          </div>
        </div>
      </div>
      
      <!-- Branded Live Demo Personalization Form -->
      <div class="panel" style="margin-top:18px;">
        <form onsubmit="saveDemoCredentials(event)">
          <div class="panel-title"><div><h2>Personalize Live Demo Details (Branding)</h2><p>Enter your real handles. These will instantly appear across the entire CRM, schedules, and active logs to show a 100% active, branded demo to your client!</p></div></div>
          <div class="compact-form">
            ${field("Real WhatsApp Number", "demoWa", "text", "+91 90000 00000", true, customer ? customer.phone : "+91 90000 00000")}
            ${field("Real Instagram Handle", "demoInsta", "text", "@demo_fashion", true, customer?.instaHandle || "@demo_fashion")}
            ${field("Real Facebook Page Name", "demoFb", "text", "Demo Fashion Store Page", true, customer?.fbPage || "Demo Fashion Store Page")}
          </div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("check-check")} Link & Personalize Branded Demo</button>
        </form>
      </div>

      <div class="grid cols-2" style="margin-top:18px;">
        <div class="panel">
          <div class="panel-title"><div><h2>Posting Schedule</h2><p>Daily auto-published product updates.</p></div></div>
          <div class="timeline" style="max-height: 240px; overflow-y: auto;">
            ${schedule.map((x) => `
              <div class="timeline-row">
                <span></span>
                <strong>${x.time} - ${x.task}</strong>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span class="badge ${x.status === 'Completed' ? '' : 'warn'}">${x.status}</span>
                  <button class="icon-btn" onclick="deleteScheduleItem('${x.id}')" title="Delete" style="color:var(--danger);width:24px;height:24px;">${icon("trash-2", 13)}</button>
                </div>
              </div>
            `).join("")}
            ${schedule.length === 0 ? `<div class="empty">No postings scheduled. Add one below!</div>` : ""}
          </div>
        </div>
        <form class="panel" onsubmit="addScheduleItem(event)">
          <div class="panel-title"><div><h2>Schedule New Post</h2><p>Set timing for daily automatic social posts.</p></div></div>
          <div class="grid cols-2">
            ${field("Publish Time", "schTime", "time", "", true)}
            ${field("Post Task", "schTask", "text", "E.g. Facebook daily offer post", true)}
          </div>
          <button class="btn" type="submit" style="margin-top:12px">${icon("calendar-plus")} Schedule Post</button>
        </form>
      </div>`;
  }
  
  if (page === "messageBot") {
    const rules = customer?.botRules || [];
    return `
      <div class="bot-layout">
        <div class="panel">
          <div class="panel-title"><div><h2>Live Reply Rules</h2><p>Auto-reply triggers matching keywords.</p></div><span class="badge">Live</span></div>
          <div class="feature-list" style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
            ${rules.map((rule) => `
              <div class="feature-item" style="padding: 10px;">
                <div style="display:grid;gap:4px;max-width:70%;">
                  <strong>${icon("message-circle")} ${rule.trigger}</strong>
                  <span class="tiny" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${rule.reply}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <button class="toggle ${rule.active ? "on" : ""}" onclick="toggleBotRule('${rule.id}')"><span></span></button>
                  <button class="icon-btn" onclick="deleteBotRule('${rule.id}')" title="Delete Rule" style="color:var(--danger);width:24px;height:24px;">${icon("trash-2", 14)}</button>
                </div>
              </div>
            `).join("")}
            ${rules.length === 0 ? `<div class="empty">No reply rules found. Add one on the right!</div>` : ""}
          </div>
        </div>
        <form class="panel" onsubmit="addBotRule(event)">
          <div class="panel-title"><div><h2>Auto Reply Builder</h2><p>Configure keywords and simulated answers.</p></div></div>
          <div class="grid cols-2">
            <div class="field"><label>Customer Keywords (slash-separated)</label><input name="trigger" placeholder="e.g. price / price koto / koto" required /></div>
            <div class="field"><label>Reply Action</label><select name="replyType"><option>Instant text reply</option></select></div>
          </div>
          <div class="field"><label>Bot Reply Text</label><textarea name="replyText" placeholder="Write bot's response message..." required></textarea></div>
          <button class="btn full" type="submit" style="margin-top:12px;">${icon("save")} Save Reply Rule</button>
        </form>
      </div>
      <div class="chat-workspace" style="margin-top:18px;">
        <div class="panel conversation-list">
          <div class="panel-title"><div><h2>Intent Analyzer</h2><p>Simulated trigger matching rate.</p></div></div>
          <div class="feature-list" style="max-height: 250px; overflow-y: auto;">
            ${rules.map((rule) => `
              <div class="feature-item" style="min-height:46px; padding:8px 12px; font-weight:700;">
                <span>${icon("zap")} ${rule.trigger.split("/")[0].trim()}</span>
                <span class="badge" style="background:#eff6ff;color:#2563eb;">${Math.floor(Math.random() * 15) + 82}% accuracy</span>
              </div>
            `).join("")}
            ${rules.length === 0 ? `<div class="empty">Add rules to analyze intents.</div>` : ""}
          </div>
        </div>
        <div class="panel" style="display:flex; flex-direction:column;">
          <div class="panel-title"><div><h2>Bot Test Chat</h2><p>Try sending words inside your reply rules triggers.</p></div></div>
          <div class="chat-box" id="bot-test-chat-box" style="flex-grow:1; min-height: 200px; max-height:280px; overflow-y:auto; margin-bottom:12px;">
            ${testChatMessages.map(m => `<div class="bubble ${m.sender === 'bot' ? 'me' : ''}">
              ${m.text}
            </div>`).join("")}
            ${isBotTyping ? `<div class="bubble me typing-bubble" style="display:flex;align-items:center;gap:4px;padding:8px 14px;"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>` : ""}
          </div>
          <form class="composer" onsubmit="testBotReply(event)" style="margin-top:0;">
            <input name="testMsg" id="bot-test-input" placeholder="Type price koto or hello..." required autocomplete="off" style="width:100%;" />
            <button class="btn" type="submit">${icon("send")} Send</button>
          </form>
        </div>
      </div>`;
  }
  
  if (page === "templateBot") {
    const flows = customer?.templateFlows || [];
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="addTemplateFlow(event)">
          <div class="panel-title"><div><h2>Template Flow Builder</h2><p>Set triggers to launch templates.</p></div><span class="badge warn">Sequence</span></div>
          <div class="grid cols-2">
            <div class="field"><label>Flow Name</label><input name="flowName" placeholder="E.g. Refund sequence" required /></div>
            <div class="field">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="color:#344054; font-size:13px; font-weight:700;">Start Trigger Keyword</label>
                <button type="button" class="chip" onclick="promptAddTriggerOption()" style="min-height:20px; padding:0 6px; font-size:10px; border-radius:4px; border:1px solid var(--line); font-weight:800; cursor:pointer;">+ Add</button>
              </div>
              <select name="flowTrigger">
                ${(customer?.triggerOptions || ["Order confirmed", "Payment pending", "Delivery shipped"]).map(t => `<option value="${t}">${t}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label style="color:#344054; font-size:13px; font-weight:700;">Sequence Delay</label>
                <button type="button" class="chip" onclick="promptAddDelayOption()" style="min-height:20px; padding:0 6px; font-size:10px; border-radius:4px; border:1px solid var(--line); font-weight:800; cursor:pointer;">+ Add</button>
              </div>
              <select name="flowDelay">
                ${(customer?.delayOptions || ["Immediately", "After 2 hours", "After 1 day"]).map(d => `<option value="${d}">${d}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label>WhatsApp Template</label>
              <select name="flowTemplate">
                ${(customer?.customTemplates || []).map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field"><label>Simulated Variables (Comma-separated)</label><textarea name="flowVars" placeholder="E.g. {{name}}, {{amount}}"></textarea></div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("save")} Save Sequence Flow</button>
        </form>
        <div class="panel">
          <div class="panel-title"><div><h2>Approval Status</h2><p>WhatsApp Meta Template status.</p></div></div>
          <div class="feature-list" style="max-height: 320px; overflow-y: auto;">
            ${(customer?.customTemplates || []).map((x, i) => `
              <div class="feature-item">
                <strong>${icon("scroll-text")} ${x.name}</strong>
                <span class="badge ${x.status === 'Approved' ? '' : x.status === 'Pending' ? 'warn' : 'off'}">${x.status}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="panel" style="margin-top:18px;">
        <div class="panel-title"><div><h2>Configured Flow sequences</h2><p>Auto-delivered campaign templates.</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Sequence Name</th><th>Trigger Keyword</th><th>Template Used</th><th>Delay Time</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${flows.map(f => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.trigger}</td>
                  <td>${f.template}</td>
                  <td>${f.delay}</td>
                  <td><span class="badge">${f.status}</span></td>
                  <td><button class="btn danger" onclick="deleteTemplateFlow('${f.id}')" style="padding:4px 8px;min-height:30px;">${icon("trash-2", 13)}</button></td>
                </tr>
              `).join("")}
              ${flows.length === 0 ? `<tr><td colspan="6" class="empty">No flows configured yet.</td></tr>` : ""}
            </tbody>
          </table>
        </div>
      </div>`;
  }
  
  if (page === "campaigns" || page === "bulkCampaigns") {
    const rows = customer?.campaigns || [];
    const isBulk = page === "bulkCampaigns";
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="createCampaign(event, ${isBulk})">
          <div class="panel-title"><div><h2>${isBulk ? "Bulk Message Campaign" : "Social Campaign Builder"}</h2><p>Publish bulk offers to lists or channels.</p></div></div>
          <div class="grid cols-2">
            ${field("Campaign Name", "cTitle", "text", "E.g. Eid Discount", true)}
            <div class="field">
              <label>Select Channel</label>
              <select name="cChannel">
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>
            ${isBulk 
              ? `<div class="field" style="grid-column: span 2;">
                   <label>Import Target Contacts (Comma-separated numbers or paste list)</label>
                   <textarea name="cAudience" placeholder="e.g. +8801700000001, +8801800000002" required style="min-height: 60px;"></textarea>
                 </div>`
              : field("Target Segment", "cAudience", "text", "E.g. Dhaka Buyers", true)
            }
            ${field("Schedule Send Date", "cDate", "date", "", true, today())}
          </div>
          <div class="field"><label>Offer Message Text</label><textarea name="cMessage" placeholder="Write offer message details here..." required></textarea></div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("megaphone")} Launch Campaign</button>
        </form>
        <div class="panel">
          <div class="panel-title"><div><h2>Delivery Preview</h2><p>Simulated active channel reach rates.</p></div></div>
          <div class="progress-list">
            ${progress("WhatsApp Channels", 92)}
            ${progress("Instagram Followers", 64)}
            ${progress("Facebook Fans", 58)}
            ${progress("Telegram Subscribers", 79)}
          </div>
        </div>
      </div>
      <div class="panel" style="margin-top:18px;">
        <div class="panel-title"><div><h2>Campaign Schedule & Status Logs</h2><p>Active and past campaigns history.</p></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Campaign Title</th><th>Target Audience</th><th>Channel</th><th>Scheduled Date</th><th>Status</th><th>Results</th><th>Actions</th></tr></thead>
            <tbody>
              ${rows.map((r, idx) => `
                <tr>
                  <td><strong>${r.title}</strong></td>
                  <td>${r.audience || 'All Audience'}</td>
                  <td><span class="badge" style="background:#eff6ff;color:#2563eb;">${r.channel}</span></td>
                  <td>${formatDate(r.date)}</td>
                  <td><span class="badge ${r.status === 'Scheduled' ? 'warn' : r.status === 'Draft' ? 'off' : ''}">${r.status}</span></td>
                  <td>${r.status === 'Delivered' ? '100% Reach' : 'Queued'}</td>
                  <td style="display:flex;gap:6px;">
                    ${r.status !== 'Delivered' ? `<button class="btn" onclick="sendCampaignNow('${idx}')" style="min-height:30px;padding:0 8px;font-size:11px;">Send Now</button>` : ''}
                    <button class="btn danger" onclick="deleteCampaign('${idx}')" style="min-height:30px;padding:0 8px;font-size:11px;">${icon("trash-2", 12)}</button>
                  </td>
                </tr>
              `).join("")}
              ${rows.length === 0 ? `<tr><td colspan="7" class="empty">No campaigns recorded yet. Build one above!</td></tr>` : ""}
            </tbody>
          </table>
        </div>
      </div>`;
  }
  
  if (page === "chat") {
    const chats = customer?.chats || [];
    const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
    const canned = customer?.replies || [];
    return `
      <div class="chat-workspace">
        <div class="panel conversation-list" style="max-height: 480px; overflow-y: auto;">
          <div class="panel-title"><div><h2>Conversations</h2><p>Select customer chat.</p></div></div>
          ${chats.map((c) => `
            <button class="${activeChat && activeChat.id === c.id ? "active" : ""}" onclick="selectActiveChat('${c.id}')" style="position:relative; padding:12px; margin-bottom:6px; width:100%;">
              <span class="avatar-cell">
                <b>${c.name.slice(0, 1)}</b>
                <em>
                  ${c.name}
                  <small>${c.phone}</small>
                </em>
              </span>
              ${c.unread ? `<span style="position:absolute;right:10px;top:10px;width:10px;height:10px;border-radius:50%;background:var(--blue);"></span>` : ""}
              <em style="position:absolute;right:10px;bottom:10px;">${c.time}</em>
            </button>
          `).join("")}
        </div>
        <div class="panel" style="display:flex; flex-direction:column; position:relative;">
          ${activeChat ? `
            <div class="panel-title" style="margin-bottom:12px;">
              <div>
                <h2>${activeChat.name}</h2>
                <p>Status: <span style="font-weight:700;color:var(--brand);">${activeChat.agentMode === 'bot' ? 'Bot Active 24/7' : 'Human Intervened'}</span></p>
              </div>
              <div class="actions">
                <button class="btn secondary" onclick="toggleAgentMode('${activeChat.id}')">
                  ${icon(activeChat.agentMode === 'bot' ? "user" : "bot", 15)} ${activeChat.agentMode === 'bot' ? 'Take Over Chat' : 'Activate Bot'}
                </button>
              </div>
            </div>
            <div class="chat-box" id="live-chat-box" style="flex-grow:1; min-height: 280px; max-height: 380px; overflow-y:auto; background:#f0f4f8; margin-bottom:12px;">
              ${activeChat.messages.map(m => `
                <div class="bubble ${m.sender === 'customer' ? '' : 'me'}" style="margin-bottom:8px;">
                  <p style="margin:0;">${m.text}</p>
                  <small class="tiny" style="display:block; text-align:right; margin-top:4px; opacity:0.6;">${m.time || 'now'}</small>
                </div>
              `).join("")}
              ${isLiveChatTyping ? `<div class="bubble typing-bubble" style="display:flex;align-items:center;gap:4px;padding:8px 14px;"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>` : ""}
            </div>
            
            <!-- Canned Reply Floating Selector -->
            ${showCannedDropdown ? `
              <div class="panel canned-popup" style="position:absolute; bottom:64px; left:18px; right:18px; z-index:15; box-shadow:0 -4px 20px rgba(0,0,0,0.15); max-height:160px; overflow-y:auto; padding:8px; background:white; border: 1px solid var(--line); border-radius:8px;">
                <strong style="display:block;font-size:12px;color:var(--muted);margin-bottom:6px;padding-left:4px;">Canned Replies Menu (Click to select)</strong>
                ${canned.map((rep) => `
                  <button onclick="insertCannedReply('${rep.replace(/'/g, "\\'")}')" style="width:100%; border:0; padding:8px; border-radius:4px; text-align:left; background:transparent; font-size:13px; font-weight:600; cursor:pointer;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='transparent'">
                    ${rep}
                  </button>
                `).join("")}
              </div>
            ` : ""}
            
            <form class="composer" onsubmit="sendLiveChatMessage(event, '${activeChat.id}')" style="position:relative; margin-top:0;">
              <input name="chatInput" id="live-chat-input" placeholder="Type message... (Type '/' for saved canned replies)" autocomplete="off" oninput="handleChatInput(event)" style="width:100%;" />
              <button class="btn" type="submit">${icon("send")} Send</button>
            </form>
          ` : `<div class="empty">No conversations active.</div>`}
        </div>
      </div>
      `;
  }
  
  if (page === "cannedReply") {
    const replies = customer?.replies || [];
    return `
      <div class="grid cols-2">
        <div class="panel">
          <div class="panel-title"><div><h2>Canned Quick Replies</h2><p>Pre-written fast responses for sales agent.</p></div></div>
          <div class="feature-list" style="max-height: 400px; overflow-y: auto;">
            ${replies.map((r, idx) => `
              <div class="feature-item" style="padding: 10px;">
                <strong style="font-size:13px;max-width:80%;">${icon("message-square-text")} ${r}</strong>
                <div style="display:flex;gap:6px;">
                  <button class="btn secondary" onclick="navigator.clipboard.writeText('${r.replace(/'/g, "\\'")}'); toast('Copied to clipboard');" style="padding:0 8px;min-height:30px;">Copy</button>
                  <button class="btn danger" onclick="deleteCannedReply('${idx}')" style="padding:0 8px;min-height:30px;">Delete</button>
                </div>
              </div>
            `).join("")}
            ${replies.length === 0 ? `<div class="empty">No canned replies. Create one on the right!</div>` : ""}
          </div>
        </div>
        <form class="panel" onsubmit="addCannedReply(event)">
          <div class="panel-title"><div><h2>Add Canned Reply</h2><p>Create a quick key shortcut response.</p></div></div>
          <div class="field"><label>Canned Reply Text</label><textarea name="cBody" placeholder="Enter greeting, pricing detail, shipping fee..." required></textarea></div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("plus")} Add Saved Reply</button>
        </form>
      </div>`;
  }
  
  if (page === "templates") {
    const templates = customer?.customTemplates || [];
    return `
      <div class="grid cols-3" style="grid-template-columns: 1fr 2fr;">
        <form class="panel" onsubmit="createTemplate(event)">
          <div class="panel-title"><div><h2>Create WhatsApp Template</h2><p>WhatsApp Meta Template approval simulation.</p></div></div>
          ${field("Template Name", "tmplName", "text", "E.g. Delivery Update", true)}
          <div class="field">
            <label>Template Text (Use variables {{name}}, {{amount}})</label>
            <textarea name="tmplBody" placeholder="Hi {{name}}, your order #{{order_id}} has been processed!" required style="min-height: 100px;"></textarea>
          </div>
          <button class="btn full" type="submit" style="margin-top:12px;">${icon("plus")} Save & Submit Meta</button>
        </form>
        <div class="grid cols-2" style="align-content:start; max-height:480px; overflow-y:auto; padding-right:4px;">
          ${templates.map((t) => `
            <article class="template-card" style="min-height:190px;">
              <span class="badge ${t.status === "Approved" ? "" : t.status === "Pending" ? "warn" : "off"}" style="align-self: flex-start;">${t.status}</span>
              <strong>${t.name}</strong>
              <p style="font-size:13px; line-height:1.45;">${t.body}</p>
              <div class="actions" style="margin-top:auto; display:flex; gap:8px;">
                <button class="btn secondary" onclick="navigator.clipboard.writeText('${t.body.replace(/'/g, "\\'")}'); toast('Body copied!');" title="Copy template body">${icon("copy", 14)} Copy</button>
                <button class="btn danger" onclick="deleteTemplate('${t.id}')" title="Delete Template" style="padding:0 8px;">${icon("trash-2", 14)}</button>
              </div>
            </article>
          `).join("")}
          ${templates.length === 0 ? `<div class="empty" style="grid-column: span 2;">No custom templates recorded yet.</div>` : ""}
        </div>
      </div>`;
  }
  
  if (page === "activityLog") {
    const logs = customer?.logs || [];
    return `
      <div class="panel">
        <div class="panel-title">
          <div><h2>Activity Timeline logs</h2><p>Track bot, templates and account events.</p></div>
          <button class="btn secondary" onclick="toast('Logs exported as CSV')">${icon("download")} Export Logs</button>
        </div>
        <div class="timeline" style="max-height: 420px; overflow-y:auto; padding-right:8px;">
          ${logs.map((l, i) => `
            <div class="timeline-row">
              <span></span>
              <strong>${l}</strong>
              <em>${i + 1}h ago</em>
            </div>
          `).join("")}
          ${logs.length === 0 ? `<div class="empty">No activity logs recorded.</div>` : ""}
        </div>
      </div>`;
  }
  
  if (page === "aiPrompts") {
    const prompts = customer?.aiPrompts || [];
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="generateAIPromptCopy(event)">
          <div class="panel-title"><div><h2>AI Sales Copywriter</h2><p>Generate highly engaging English-Bengali promotional posts.</p></div></div>
          <div class="grid cols-2">
            ${field("Product Name", "aiProduct", "text", "Premium Cotton Kurti", true)}
            <div class="field">
              <label>Select Sales Tone</label>
              <select name="aiTone">
                <option value="Friendly sales">Friendly sales (বন্ধুত্বপূর্ণ)</option>
                <option value="Luxury">Luxury (প্রিমিয়াম ব্রান্ড)</option>
                <option value="Urgent offer">Urgent offer (সীমিত অফার)</option>
              </select>
            </div>
          </div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("sparkles")} Write with AI Prompts</button>
        </form>
        <div class="panel" style="display:flex; flex-direction:column;">
          <div class="panel-title"><div><h2>Sales Copy Generator Output</h2><p>Ready to copy and post.</p></div></div>
          <div class="feature-list" style="flex-grow:1; max-height:380px; overflow-y:auto;">
            ${prompts.map((p) => `
              <div class="preview-message" style="margin-bottom:12px; position:relative; padding-top:12px;">
                <strong>${p.product} (${p.tone})</strong>
                <p style="white-space:pre-wrap; font-size:13px; margin:8px 0; font-family:inherit;">${p.copy}</p>
                <div style="display:flex; gap:8px; margin-top:8px;">
                  <button class="btn secondary" onclick="navigator.clipboard.writeText('${p.copy.replace(/\n/g, '\\n').replace(/'/g, "\\'")}'); toast('Copy copied!');">${icon("copy", 14)} Copy Post Text</button>
                  <button class="btn danger" onclick="deleteAICopy('${p.id}')" style="padding:0 8px;">${icon("trash-2", 14)}</button>
                </div>
              </div>
            `).join("")}
            ${prompts.length === 0 ? `<div class="empty">Enter product details on the left to write post contents.</div>` : ""}
          </div>
        </div>
      </div>`;
  }
  
  if (page === "settings") {
    const set = customer?.settings || { timezone: "Asia/Dhaka", alertMethod: "WhatsApp alert when disconnected", expiryProtection: "Lock after expiry date" };
    return `
      <div class="grid cols-2">
        <form class="panel" onsubmit="saveCustomerSettings(event)">
          <div class="panel-title"><div><h2>Portal Preferences Settings</h2><p>Adjust system expiry warnings & triggers.</p></div></div>
          <div class="field">
            <label>Operating Timezone</label>
            <select name="sTimezone">
              <option value="Asia/Dhaka" ${set.timezone === 'Asia/Dhaka' ? 'selected' : ''}>Asia/Dhaka (Dhaka time)</option>
              <option value="Asia/Kolkata" ${set.timezone === 'Asia/Kolkata' ? 'selected' : ''}>Asia/Kolkata (IST time)</option>
            </select>
          </div>
          <div class="field">
            <label>Disconnection Alert Preferences</label>
            <select name="sAlert">
              <option value="WhatsApp alert when disconnected" ${set.alertMethod === 'WhatsApp alert when disconnected' ? 'selected' : ''}>WhatsApp alert when disconnected</option>
              <option value="Email alert only" ${set.alertMethod === 'Email alert only' ? 'selected' : ''}>Email alert only</option>
            </select>
          </div>
          <div class="field">
            <label>Expiry Protection Strategy</label>
            <select name="sProtection">
              <option value="Lock after expiry date" ${set.expiryProtection === 'Lock after expiry date' ? 'selected' : ''}>Lock after expiry date</option>
              <option value="Warn only" ${set.expiryProtection === 'Warn only' ? 'selected' : ''}>Warn only</option>
            </select>
          </div>
          <button class="btn" type="submit" style="margin-top:12px;">${icon("save")} Save Settings Preferences</button>
        </form>
        <form class="panel" onsubmit="changeCustomerPassword(event)">
          <div class="panel-title"><div><h2>Change Account Password</h2><p>Change your customer portal login password.</p></div></div>
          ${field("Current Password", "curPass", "password", "Enter current password", true)}
          ${field("New Secure Password", "newPass", "password", "Enter new password", true)}
          <button class="btn" type="submit" style="margin-top:12px;">${icon("key")} Update Password</button>
        </form>
      </div>`;
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
  
  const def = defaultState.customers[0];
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
    logs: ["Customer account created"],
    botRules: structuredClone(def.botRules),
    templateFlows: structuredClone(def.templateFlows),
    customTemplates: structuredClone(def.customTemplates),
    chats: structuredClone(def.chats),
    aiPrompts: [],
    postingSchedule: structuredClone(def.postingSchedule),
    settings: structuredClone(def.settings)
  });
  saveState();
  form.reset();
  toast("Customer ID created");
  render();
}

function startEditCustomer(id) {
  editingCustomerId = id;
  render();
}

function cancelEditCustomer() {
  editingCustomerId = null;
  render();
}

function saveCustomerEdit(event) {
  event.preventDefault();
  const form = event.target;
  const permissions = [...form.querySelectorAll('input[name="permissions"]:checked')].map((x) => x.value);
  const c = state.customers.find((x) => x.id === editingCustomerId);
  if (!c) return;
  
  const usernameTaken = state.customers.some((x) => x.id !== editingCustomerId && x.username === form.username.value.trim());
  if (usernameTaken) return toast("This login ID already exists");
  
  c.business = form.business.value.trim();
  c.owner = form.owner.value.trim();
  c.phone = form.phone.value.trim();
  c.email = form.email.value.trim();
  c.username = form.username.value.trim();
  c.password = form.password.value.trim();
  c.plan = form.plan.value;
  c.expiresAt = form.expiresAt.value;
  c.permissions = permissions;
  c.logs.unshift("Customer details updated by admin");
  
  editingCustomerId = null;
  saveState();
  toast("Customer ID updated successfully");
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
  if (c) {
    c.connected[ch] = !c.connected[ch];
  } else if (state.session?.role === "admin") {
    if (!state.adminConnected) state.adminConnected = { whatsapp: true, instagram: false, facebook: false, telegram: false };
    state.adminConnected[ch] = !state.adminConnected[ch];
  }
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

// Global and Portal Interactive Helper Handlers
function handleSearch(value) {
  searchQuery = value;
  render();
}

function toggleNotifications() {
  notificationsOpen = !notificationsOpen;
  render();
}

function markAllNotificationsRead(event) {
  if (event) event.stopPropagation();
  notifications.forEach(n => n.read = true);
  notificationsOpen = false;
  render();
  toast("All notifications marked as read");
}

function addScheduleItem(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const time = event.target.schTime.value;
  const task = event.target.schTask.value.trim();
  c.postingSchedule.push({ id: `sch_${Date.now()}`, time, task, status: "Pending" });
  c.logs.unshift(`Scheduled social post: ${task} at ${time}`);
  saveState();
  toast("Post scheduled successfully");
  render();
}

function deleteScheduleItem(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.postingSchedule = c.postingSchedule.filter(x => x.id !== id);
  saveState();
  render();
}

function toggleBotRule(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  const rule = c.botRules.find(x => x.id === id);
  if (rule) rule.active = !rule.active;
  saveState();
  render();
}

function deleteBotRule(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.botRules = c.botRules.filter(x => x.id !== id);
  saveState();
  render();
}

function addBotRule(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const trigger = event.target.trigger.value.trim();
  const reply = event.target.replyText.value.trim();
  c.botRules.push({ id: `rule_${Date.now()}`, trigger, type: "Instant text reply", reply, active: true });
  c.logs.unshift(`Added reply rule: ${trigger}`);
  saveState();
  toast("Bot rule added");
  render();
}

function testBotReply(event) {
  event.preventDefault();
  const text = event.target.testMsg.value.trim();
  if (!text) return;
  testChatMessages.push({ sender: "customer", text });
  event.target.testMsg.value = "";
  
  isBotTyping = true;
  render();
  
  setTimeout(() => {
    const box = document.getElementById("bot-test-chat-box");
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
  
  setTimeout(() => {
    isBotTyping = false;
    const c = getCurrentCustomer();
    const rules = c ? c.botRules : defaultState.customers[0].botRules;
    const match = rules.find(r => r.active && r.trigger.split("/").some(t => text.toLowerCase().includes(t.trim().toLowerCase())));
    
    if (match) {
      testChatMessages.push({ sender: "bot", text: match.reply });
    } else {
      testChatMessages.push({ sender: "bot", text: "দুঃখিত, এই কীওয়ার্ড এর জন্য কোনো নিয়ম খুঁজে পাওয়া যায়নি। 'price' বা 'delivery' লিখে টেস্ট করুন!" });
    }
    render();
    setTimeout(() => {
      const box = document.getElementById("bot-test-chat-box");
      if (box) box.scrollTop = box.scrollHeight;
    }, 50);
  }, 1200);
}

function addTemplateFlow(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const name = event.target.flowName.value.trim();
  const trigger = event.target.flowTrigger.value;
  const delay = event.target.flowDelay.value;
  const template = event.target.flowTemplate.value;
  c.templateFlows.push({ id: `flow_${Date.now()}`, name, trigger, delay, template, status: "Ready" });
  c.logs.unshift(`Created template sequence flow: ${name}`);
  saveState();
  toast("Template flow added");
  render();
}

function deleteTemplateFlow(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.templateFlows = c.templateFlows.filter(x => x.id !== id);
  saveState();
  render();
}

function createCampaign(event, isBulk) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const title = event.target.cTitle.value.trim();
  const channel = event.target.cChannel.value;
  const audience = event.target.cAudience.value.trim();
  const date = event.target.cDate.value;
  const text = event.target.cMessage.value.trim();
  
  c.campaigns.unshift({ title, channel, status: "Scheduled", date, audience });
  c.logs.unshift(`Scheduled ${isBulk ? 'bulk' : 'social'} campaign: ${title} via ${channel}`);
  notifications.unshift({ id: `n_${Date.now()}`, text: `Campaign "${title}" has been scheduled.`, time: "Just now", read: false });
  
  saveState();
  toast("Campaign scheduled successfully");
  render();
}

function sendCampaignNow(idx) {
  const c = getCurrentCustomer();
  if (!c) return;
  const camp = c.campaigns[idx];
  if (camp) {
    camp.status = "Delivered";
    c.logs.unshift(`Sent campaign instantly: ${camp.title}`);
    notifications.unshift({ id: `n_${Date.now()}`, text: `Campaign "${camp.title}" sent successfully!`, time: "Just now", read: false });
    saveState();
    toast("Campaign sent successfully!");
    render();
  }
}

function deleteCampaign(idx) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.campaigns.splice(idx, 1);
  saveState();
  render();
}

function selectActiveChat(id) {
  activeChatId = id;
  const c = getCurrentCustomer();
  if (c) {
    const chat = c.chats.find(x => x.id === id);
    if (chat) chat.unread = false;
  }
  saveState();
  render();
  setTimeout(() => {
    const box = document.getElementById("live-chat-box");
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
}

function toggleAgentMode(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  const chat = c.chats.find(x => x.id === id);
  if (chat) {
    chat.agentMode = chat.agentMode === 'bot' ? 'human' : 'bot';
    c.logs.unshift(`Chat with ${chat.name} mode changed to ${chat.agentMode}`);
    saveState();
    render();
  }
}

function sendLiveChatMessage(event, chatId) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const chat = c.chats.find(x => x.id === chatId);
  if (!chat) return;
  const text = event.target.chatInput.value.trim();
  if (!text) return;
  
  const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  chat.messages.push({ sender: "agent", text, time });
  chat.time = "now";
  event.target.chatInput.value = "";
  showCannedDropdown = false;
  render();
  
  setTimeout(() => {
    const box = document.getElementById("live-chat-box");
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
  
  if (chat.agentMode === 'bot') {
    isLiveChatTyping = true;
    render();
    setTimeout(() => {
      const box = document.getElementById("live-chat-box");
      if (box) box.scrollTop = box.scrollHeight;
    }, 50);
    
    setTimeout(() => {
      isLiveChatTyping = false;
      const match = c.botRules.find(r => r.active && r.trigger.split("/").some(t => text.toLowerCase().includes(t.trim().toLowerCase())));
      
      if (match) {
        chat.messages.push({ sender: "bot", text: match.reply, time });
      } else {
        chat.messages.push({ sender: "bot", text: "আমরা আপনার বার্তাটি পেয়েছি। একজন এজেন্ট শীঘ্রই যুক্ত হবে। ধন্যবাদ!", time });
      }
      saveState();
      render();
      setTimeout(() => {
        const box = document.getElementById("live-chat-box");
        if (box) box.scrollTop = box.scrollHeight;
      }, 50);
    }, 1200);
  } else {
    saveState();
  }
}

function handleChatInput(event) {
  const val = event.target.value;
  if (val.endsWith("/")) {
    showCannedDropdown = true;
  } else if (!val.includes("/")) {
    showCannedDropdown = false;
  }
  render();
}

function insertCannedReply(text) {
  const input = document.getElementById("live-chat-input");
  if (input) {
    const index = input.value.lastIndexOf("/");
    input.value = input.value.substring(0, index) + text;
    input.focus();
  }
  showCannedDropdown = false;
  render();
}

function addCannedReply(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  const val = event.target.cBody.value.trim();
  if (c && val) {
    c.replies.unshift(val);
    c.logs.unshift("Added quick canned reply text");
    saveState();
    toast("Saved Reply Added");
    render();
  }
}

function deleteCannedReply(idx) {
  const c = getCurrentCustomer();
  if (c) {
    c.replies.splice(idx, 1);
    saveState();
    render();
  }
}

function createTemplate(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const name = event.target.tmplName.value.trim();
  const body = event.target.tmplBody.value.trim();
  c.customTemplates.unshift({ id: `tmpl_${Date.now()}`, name, body, status: "Pending" });
  c.logs.unshift(`Created WhatsApp template: ${name}`);
  saveState();
  toast("Template submitted for Meta review!");
  render();
}

function deleteTemplate(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.customTemplates = c.customTemplates.filter(x => x.id !== id);
  saveState();
  render();
}

function generateAIPromptCopy(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const prod = event.target.aiProduct.value.trim();
  const tone = event.target.aiTone.value;
  
  let copy = "";
  if (tone === "Friendly sales") {
    copy = `✨ New Arrival Alert! ✨\nপ্রিয় কাস্টমার, চমৎকার ডিজাইনের "${prod}" এখন স্টক-এ! অত্যন্ত আরামদায়ক এবং সফট প্রিমিয়াম কোয়ালিটি ফ্যাব্রিক।\n🌸 কালার ও সাইজ এভেইলএবল।\n💰 প্রাইজ জানতে ইনবক্স করুন অথবা কমেন্ট করুন YES।\n🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা!`;
  } else if (tone === "Luxury") {
    copy = `💎 Elevate Your Style 💎\nIntroducing our premium "${prod}". Crafted with pure royal sophistication and absolute comfort in mind.\n✨ Exquisite designs for those who settle for nothing but perfection.\n📩 Direct Message us to pre-order or customize your perfect fit. Free shipping inside Dhaka!`;
  } else {
    copy = `🔥 FLASH SALE - LIMITED STOCK 🔥\nদেরী করবেন না! আমাদের সবচেয়ে জনপ্রিয় "${prod}" এ পাচ্ছেন বিশেষ ছাড়!\n⚡ অফার প্রাইজে স্টক শেষ হওয়ার আগেই লুফে নিন!\n👉 কমেন্ট করুন "ORDER" অথবা সরাসরি ইনবক্স করুন।\n💵 ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধের সুবিধা)`;
  }
  
  c.aiPrompts.unshift({ id: `ai_${Date.now()}`, product: prod, tone, copy });
  c.logs.unshift(`Generated AI post copy for ${prod}`);
  saveState();
  toast("AI Copy generated and saved!");
  render();
}

function deleteAICopy(id) {
  const c = getCurrentCustomer();
  if (!c) return;
  c.aiPrompts = c.aiPrompts.filter(x => x.id !== id);
  saveState();
  render();
}

function saveCustomerSettings(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  c.settings.timezone = event.target.sTimezone.value;
  c.settings.alertMethod = event.target.sAlert.value;
  c.settings.expiryProtection = event.target.sProtection.value;
  c.logs.unshift("Portal preferences and settings updated");
  saveState();
  toast("Settings updated successfully!");
  render();
}

function changeCustomerPassword(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  if (!c) return;
  const cur = event.target.curPass.value.trim();
  const nw = event.target.newPass.value.trim();
  if (cur !== c.password) {
    toast("Current password does not match!");
    return;
  }
  c.password = nw;
  c.logs.unshift("Account password updated successfully");
  event.target.reset();
  saveState();
  toast("Password changed successfully!");
  render();
}

function promptAddTriggerOption() {
  const value = prompt("Enter new Start Trigger Keyword option:");
  if (value && value.trim()) {
    const c = getCurrentCustomer();
    if (c) {
      if (!c.triggerOptions) c.triggerOptions = ["Order confirmed", "Payment pending", "Delivery shipped"];
      c.triggerOptions.push(value.trim());
      c.logs.unshift(`Added new flow trigger keyword: ${value.trim()}`);
      saveState();
      render();
      toast("Trigger option added!");
    }
  }
}

function promptAddDelayOption() {
  const value = prompt("Enter new Sequence Delay option:");
  if (value && value.trim()) {
    const c = getCurrentCustomer();
    if (c) {
      if (!c.delayOptions) c.delayOptions = ["Immediately", "After 2 hours", "After 1 day"];
      c.delayOptions.push(value.trim());
      c.logs.unshift(`Added new flow delay option: ${value.trim()}`);
      saveState();
      render();
      toast("Delay option added!");
    }
  }
}

function saveDemoCredentials(event) {
  event.preventDefault();
  const c = getCurrentCustomer();
  const wa = event.target.demoWa.value.trim();
  const insta = event.target.demoInsta.value.trim();
  const fb = event.target.demoFb.value.trim();
  
  if (c) {
    c.phone = wa;
    c.instaHandle = insta;
    c.fbPage = fb;
    c.logs.unshift(`Branded demo linked successfully: WA (${wa}), Insta (${insta}), FB (${fb})`);
    saveState();
    toast("Demo channels branded successfully!");
    render();
  } else if (state.session?.role === "admin") {
    // If admin, we can save to a global state or active customer
    state.customers.forEach(cust => {
      cust.phone = wa;
      cust.instaHandle = insta;
      cust.fbPage = fb;
      cust.logs.unshift(`Branded demo linked by Admin: WA (${wa}), Insta (${insta}), FB (${fb})`);
    });
    saveState();
    toast("All demo customer portals branded successfully!");
    render();
  }
}

render();
