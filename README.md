# Zoho CRM Currency Widget

Віджет для модуля Deals у Zoho CRM, який:

- Отримує курс USD з API НБУ
- Виводить курс в угоді з поля `Курс валют`
- Розраховує різницю між курсами (у %)
- Дає можливість оновити курс в угоді, якщо різниця ≥ 5%

# Використані технології

- Zoho CRM Widgets SDK
- Зовнішній API: [API НБУ](https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json)
- Команда [`zet pack`] для упаковки ZIP-архіву віджету

# Запуск віджета

1. Створити поле типу Decimal у модулі Deals:

   - Назва: `Deal Rate`
   - API Name: `Deal_Rate`

2. Створив архів `MyWidget.zip`

3. Завантажив в Zoho CRM:

- Type: `Related List`
- File Upload: `MyWidget.zip`
- Index Page: `/widget.html`

5. Відкрити картку угоди та протестувати роботу віджету.

6. Посилання на відео: 

[https://drive.google.com/file/d/1HSO4lcgOmhLlOrGbClT9LSvVKA2HhmkP/view?usp=sharing]
