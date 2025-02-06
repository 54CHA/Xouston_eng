export interface FormData {
  name: string;
  contact: string;
  company?: string;
  description: string;
}

export const submitForm = async (formData: FormData) => {
  const TELEGRAM_BOT_TOKEN = "7686483157:AAFAmb3YY6l6smPN3kBg_GdSqt9byZuDYUs";
  const TELEGRAM_CHAT_ID = "-1002469498130";

  const message = `
🔥 Новая заявка!

👤 Имя: ${formData.name}
📧 Контакт: ${formData.contact}
🏢 Компания: ${formData.company || "Не указана"}
📝 Описание: ${formData.description}
  `.trim();

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.description || "Failed to send message");
  }

  return data;
};
