const express = require("express");
const app = express();

// Middleware per leggere JSON
app.use(express.json());

// Rotta base (per test)
app.get("/", (req, res) => {
  res.send("✅ Backend attivo su Render");
});

// Rotta API: avvio trial (demo)
app.post("/api/start-trial", (req, res) => {
  const { productId, days, codiceFiscale } = req.body;

  // Qui un backend vero salverebbe i dati su un DB
  const trialId = "trial_" + Date.now();

  res.json({
    message: "Trial creato con successo",
    productId,
    days,
    codiceFiscale,
    trialId,
    expiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
  });
});

// Rotta API: completamento trial (demo)
app.post("/api/complete", (req, res) => {
  const { trialId, action } = req.body;

  if (action === "return") {
    return res.json({
      message: `Prodotto restituito, addebitato 1% (trial ${trialId})`
    });
  } else if (action === "keep") {
    return res.json({
      message: `Prodotto mantenuto, addebitato importo totale (trial ${trialId})`
    });
  } else {
    return res.status(400).json({ message: "Azione non valida" });
  }
});

// Avvio server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su porta ${PORT}`);
});
