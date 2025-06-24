const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const TENANTS_PATH = path.join(__dirname, 'tenants.json');
function loadTenants() {
  return JSON.parse(fs.readFileSync(TENANTS_PATH, 'utf8'));
}

function saveTenants(tenants) {
  fs.writeFileSync(TENANTS_PATH, JSON.stringify(tenants, null, 2), 'utf8');
}


const app = express();
app.use(cors());

app.get('/api/tenants', (req, res) => {
  try {
    const tenants = loadTenants();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load tenants' });
  }
});

app.get('/api/tenants/:tenantId', (req, res) => {
  const tenantId = req.params.tenantId;
  try {
    const tenants = loadTenants();
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load tenant' });
  }
}
);
app.post('/api/tenants', express.json(), (req, res) => {
  const newTenant = req.body;
  try {
    const tenants = loadTenants();
    tenants.push(newTenant);
    saveTenants(tenants);
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tenant' });
  }
});
app.patch('/api/tenants/:tenantId', express.json(), (req, res) => {
  const tenantId = req.params.tenantId;
  const updatedTenant = req.body;
  try {
    const tenants = loadTenants();
    const index = tenants.findIndex(t => t.id === tenantId);
    if (index !== -1) {
      tenants[index] = { ...tenants[index], ...updatedTenant };
      saveTenants(tenants);
      res.json(tenants[index]);
    } else {
      res.status(404).json({ error: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tenant' });
  }
}
);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Tenant backend server running on port ${PORT}`);
}
);


