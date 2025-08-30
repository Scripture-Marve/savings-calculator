function calculateAll() {
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const isMonthly = document.getElementById('isMonthly').value;

  const simpleBox = document.getElementById('simpleOneTimeBox');
  const compoundBox = document.getElementById('compoundOneTimeBox');
  const monthlyBox = document.getElementById('monthlyBox');
  const compoundMonthlyBox = document.getElementById('compoundMonthlyBox');

  simpleBox.innerHTML = '';
  compoundBox.innerHTML = '';
  monthlyBox.innerHTML = '';
  compoundMonthlyBox.innerHTML = '';

  if (isNaN(amount) || isNaN(rate)) {
    simpleBox.innerHTML = '<p style="color:red;">Please enter valid amount and rate.</p>';
    return;
  }

  const annualRate = rate / 100;
  const monthlyRate = annualRate / 12;
  const dailyRate = annualRate / 365;
  const weeklyRate = annualRate / 52;

  // 1. Simple Interest (One-Time)
  const simpleYearly = amount * annualRate;
  const simple3Years = simpleYearly * 3;
  simpleBox.innerHTML = `
    <h3>1. Simple Interest (One-Time)</h3>
    <p><strong>Daily:</strong> ₦${(amount * dailyRate).toFixed(2)}</p>
    <p><strong>Weekly:</strong> ₦${(amount * weeklyRate).toFixed(2)}</p>
    <p><strong>Monthly:</strong> ₦${(amount * monthlyRate).toFixed(2)}</p>
    <p><strong>Yearly:</strong> ₦${simpleYearly.toFixed(2)}</p>
    <p><strong>3 Years:</strong> ₦${simple3Years.toFixed(2)}</p>
  `;

  // 2. Compound Interest (One-Time, Monthly Compounding)
  const compound1Yr = amount * Math.pow((1 + monthlyRate), 12);
  const compound3Yr = amount * Math.pow((1 + monthlyRate), 36);
  compoundBox.innerHTML = `
    <h3>2. Compound Interest (One-Time)</h3>
    <p><strong>1 Year Value:</strong> ₦${compound1Yr.toFixed(2)} (Interest: ₦${(compound1Yr - amount).toFixed(2)})</p>
    <p><strong>3 Years Value:</strong> ₦${compound3Yr.toFixed(2)} (Interest: ₦${(compound3Yr - amount).toFixed(2)})</p>
  `;

  // 3. Monthly Savings (Simple Interest)
  if (isMonthly === "yes") {
    let totalSavings = 0;
    let totalInterest = 0;

    for (let year = 1; year <= 3; year++) {
      totalSavings += amount * 12;
      totalInterest += totalSavings * annualRate;
    }

    const yearlyInterest = (amount * 12) * annualRate;

    monthlyBox.innerHTML = `
      <h3>3. Monthly Savings (Simple Interest)</h3>
      <p><strong>Monthly Saving:</strong> ₦${amount.toFixed(2)}</p>
      <p><strong>Yearly Interest:</strong> ₦${yearlyInterest.toFixed(2)}</p>
      <p><strong>Interest in 3 Years:</strong> ₦${totalInterest.toFixed(2)}</p>
    `;

    // 4. Compound Interest on Monthly Contributions (Breakdown per Year)
    function calculateCompoundMonthly(months, monthlyAmount, monthlyRate) {
      let total = 0;
      for (let m = 1; m <= months; m++) {
        const monthsLeft = months - (m - 1);
        const fv = monthlyAmount * Math.pow(1 + monthlyRate, monthsLeft);
        total += fv;
      }
      return total;
    }

    const total1yr = calculateCompoundMonthly(12, amount, monthlyRate);
    const total2yr = calculateCompoundMonthly(24, amount, monthlyRate);
    const total3yr = calculateCompoundMonthly(36, amount, monthlyRate);

    const contrib1yr = amount * 12;
    const contrib2yr = amount * 24;
    const contrib3yr = amount * 36;

    compoundMonthlyBox.innerHTML = `
      <h3>4. Monthly Savings (Compound Interest)</h3>
      <p><strong>After 1 Year:</strong> ₦${total1yr.toFixed(2)} 
         (Contributed: ₦${contrib1yr.toFixed(2)} | Interest: ₦${(total1yr - contrib1yr).toFixed(2)})</p>
      <p><strong>After 2 Years:</strong> ₦${total2yr.toFixed(2)} 
         (Contributed: ₦${contrib2yr.toFixed(2)} | Interest: ₦${(total2yr - contrib2yr).toFixed(2)})</p>
      <p><strong>After 3 Years:</strong> ₦${total3yr.toFixed(2)} 
         (Contributed: ₦${contrib3yr.toFixed(2)} | Interest: ₦${(total3yr - contrib3yr).toFixed(2)})</p>
    `;
  }
}
