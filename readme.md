## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

# API Routes

## Authentication Routes

### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.

### Verify Email

- **URL:** `/api/auth/verify/:verificationToken`
- **Method:** `GET`
- **Description:** Verify user's email address.

### Resend Verification Email

- **URL:** `/api/auth/verify`
- **Method:** `GET`
- **Description:** Resend verification email.

### User Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and generate access token.

### Refresh Access Token

- **URL:** `/api/auth/refresh`
- **Method:** `POST`
- **Description:** Refresh user's access token using refresh token.

### Get Current User

- **URL:** `/api/auth/current`
- **Method:** `GET`
- **Description:** Get current authenticated user's details.

### User Logout

- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Description:** Logout current user.

### Update Subscription

- **URL:** `/api/auth/subscription`
- **Method:** `PATCH`
- **Description:** Update user's subscription type.

### Update User Avatar

- **URL:** `/api/auth/avatars`
- **Method:** `PATCH`
- **Description:** Update user's avatar image.

---

## Contacts Routes

### Get All Contacts

- **URL:** `/api/contacts/`
- **Method:** `GET`
- **Description:** Get all contacts of the authenticated user.

### Get Contact by ID

- **URL:** `/api/contacts/:id`
- **Method:** `GET`
- **Description:** Get a specific contact by ID.

### Add New Contact

- **URL:** `/api/contacts/`
- **Method:** `POST`
- **Description:** Add a new contact for the authenticated user.

### Update Contact by ID

- **URL:** `/api/contacts/:id`
- **Method:** `PUT`
- **Description:** Update an existing contact by ID.

### Delete Contact by ID

- **URL:** `/api/contacts/:id`
- **Method:** `DELETE`
- **Description:** Delete a contact by ID.

### Update Contact Favorite Status

- **URL:** `/api/contacts/:id/favorite`
- **Method:** `PATCH`
- **Description:** Update favorite status of a contact.
