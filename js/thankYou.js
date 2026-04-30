async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) return;

  const formDataObj = JSON.parse(formDataRaw);

  const formData = new FormData();
  formData.append("sheetName", "Lead");

  // faqat kerakli fieldlar
  formData.append("Telefon raqam", formDataObj.TelefonRaqam || "");
  formData.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat || "");

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwA_peURvzCYXzZ19SAt0nZj5vRwkH1FbydgDT2CYh3TuU_Jm9-WrIS3qd5V1XxhaaU/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}

window.onload = sendFormData;