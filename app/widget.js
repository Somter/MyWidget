const nbuRate = document.getElementById("nbuRate");
const dealRateId = document.getElementById("dealRate");
const diff = document.getElementById("diff");
const updateBtn = document.getElementById("updateBtn");

let fieldId = null;
let currentNbuRate = null;

async function GetgetExchangeRate() {
  try {
    const resp = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json"
    );
    const data = await resp.json();
    SetData(data);
  } catch (err) {
    console.log(err);
  }
}

function SetData(data) {
  currentNbuRate = data[0].rate;
  nbuRate.innerHTML = `${currentNbuRate} ${data[0].cc}`;
}

GetgetExchangeRate();

function CalculatingDifference(transactionRate, NbuRate) {
  return (transactionRate / NbuRate - 1) * 100;
}

function CheckingСourse(Rate) {
  if (Rate >= 5) {
    updateBtn.style.display = "block";
  } else {
    updateBtn.style.display = "none";
  }
}

ZOHO.embeddedApp.on("PageLoad", function (data) {
  fieldId = data.EntityId;

  ZOHO.CRM.API.getRecord({ Entity: "Deals", RecordID: fieldId }).then(function (
    response
  ) {
    const dealData = response.data[0];
    console.log("Дані угоди:", dealData);

    const dealRate = dealData["Deal_Rate"] || 0;
    dealRateId.innerText = dealRate;

    if (dealRate === 0) {
      diff.innerText = "Курс не встановлено";
      updateBtn.style.display = "block";
    } else if (currentNbuRate) {
      const percentageDiff = CalculatingDifference(
        dealRate,
        currentNbuRate
      ).toFixed(1);
      diff.innerText = percentageDiff + " %";
      CheckingСourse(percentageDiff);
    }
  });

  updateBtn.addEventListener("click", function () {
    console.log(fieldId, currentNbuRate);
    const roundedNbuRate = Number(currentNbuRate.toFixed(2));

    ZOHO.CRM.API.updateRecord({
      Entity: "Deals",
      APIData: [
        {
          id: fieldId,
          Deal_Rate: roundedNbuRate,
        },
      ],
    }).then(function (data) {
      console.log("Поле оновлено:", data);
      location.reload();
    });
  });
});

ZOHO.embeddedApp.init().then(() => {
  console.log("ZOHO init");
});
