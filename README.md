# 🧩 AFFiNE + Chatwoot Integration with Multi-Tenant White Labelling

This project integrates [AFFiNE](https://github.com/toeverything/AFFiNE) with [Chatwoot](https://www.chatwoot.com/) and adds full multi-tenant white-labelling support based on subdomain or query param.

> 🛠 Built using Docker Compose, React, and a minimal tenant backend.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/affine-chatwoot-white-label.git
cd affine-chatwoot-white-label
```

### 2. Prepare Chatwoot Database

```bash
docker compose run --rm rails bundle exec rails db:chatwoot_prepare
```

### 3. Start All Services

```bash
docker compose up -d
```

This will start:
- ✅ AFFiNE (on `http://localhost:5173`)
- ✅ Chatwoot (on `http://localhost:3000`)
- ✅ Tenant Backend (on `http://localhost:4000`)

---

## 🏷️ Branding & Tenant Configuration

### 🔍 View Existing Tenants

To view all registered tenants:

```bash
http://localhost:4000/api/tenants
```

This will return a list of tenants with their:
- ID
- Name
- Logo
- Theme color
- Chatwoot configuration

---

### 🛠️ Create a Chatwoot Widget (Inbox Setup)

1. Go to Chatwoot dashboard:  
   👉 `http://localhost:3000`

2. Complete onboarding and create a new **Inbox** under the **Website** tab.

📸 *[Insert Screenshot of Chatwoot Inbox Creation]*

3. Once created, you'll receive a **Widget Token** (e.g., `sZZsYCPifpym86sUzR8NfpaF`)

---

### 🔗 Add Chatwoot Widget to Tenant

Make a `PATCH` request to your backend:

```http
PATCH http://localhost:4000/api/tenants/<tenant-id>
Content-Type: application/json

{
  "chatwootWidgetId": "your-widget-token-from-chatwoot"
}
```

📸 *[Insert Screenshot of Request or Postman]*

This associates the Chatwoot inbox with the tenant.

---

### 🌐 Launch a Tenant-Specific Workspace

You can access tenants via:

#### 1. Subdomain (if supported in dev)

```bash
http://acme.localhost:5173
```

#### 2. URL Parameter

```bash
http://localhost:5173/?tenant=acme
```

Once loaded, you'll see:
- ✅ Custom theme color
- ✅ Tenant logo
- ✅ Chatwoot widget for support

📸 *[Insert Screenshot of Themed Workspace]*

---

## ➕ Adding a New Tenant

To add a new tenant, either:

1. Use a local `tenants.json` file (if backend not enabled), or  
2. Use a POST API to `http://localhost:4000/api/tenants`

You need to provide:

```json
{
  "id": "globex",
  "name": "Globex Corp",
  "logo": "/logos/globex.svg",
  "theme": "#3498db"
}
```

---

## 🧠 How Branding Works

- Tenant info is loaded dynamically on page load via `TenantProvider`
- Based on `?tenant=` param or subdomain
- Injects:
  - Theme color via `--primary-color`
  - Logo in header
  - Chatwoot widget using their JS SDK and widget token

---

## 🧰 Stack

- 🔧 **Docker Compose** for orchestration
- 🧠 **React + AFFiNE** for UI
- 💬 **Chatwoot** for support
- ⚙️ **Node.js (Express)** for multi-tenant backend

---

## 📸 Screenshots (To Add)

- [ ] Chatwoot inbox creation
- [ ] Chatwoot widget ID screen
- [ ] PATCH request to backend
- [ ] Themed workspace per tenant

---

## 🎥 Demo Video

📺 [Insert your Loom/YT demo link here]

---

## ✅ Status

✔️ 80% Complete  
🚧 Remaining:
- Final styling polish
- Optional: auto TLS for subdomain support (e.g., `acme.localhost`)
