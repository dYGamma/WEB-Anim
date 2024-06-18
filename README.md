## Anixart (для PC)

### Кратко и по факту, чтобы не забыть:

- **Расположен на: http://127.0.0.1**
- **Для запуска: `docker compose -f docker-compose.dev.yml up` или `docker compose -f docker-compose.dev.yml watch`**
- **Для логов: `docker compose -f docker-compose.dev.yml logs -f`**

### Deploy
**С помощью Vercel**

Подробная инструкция для чайников:

1) Авторизация в Vercel (рекомендуется через GitHub).
2) Импорт репозитория, т.е создание нового проекта (всего нужно будет создать 2). В моём случае производится импорт **WEB-anim**.
3) После импорта будет предложено выбрать название проекта (название будет использоваться в **качестве домена**). Прописываем название, например: `ani-web-back` и выбираем нужный **Root Directory**. Сперва - **backend**. Затем, пропишем **Environment Variables**:
- **Первое поле: API_PREFIX**
- **Второе поле: /v1**

Жмем кнопку **Deploy**.

4) Успешно сделав деплой первого проекта, копируем url ссылку на наш backend и переходим к следующему этапу.
5) Создание второго проекта:
- Жмем кнопку **новый проект**
- Задаем **название** проекту
- Выбираем **Root Directory - fronted**
- **В env var** прописывем: первое поле - API_URL, второе поле - ссылка на первый проект (с префиксом **/v1**) формата `https://название-проекта.vercel.app/v1`

Затем, жмём кнопку **Deploy** и дожидаемся окончания билдинга.

**Сайт развернут**
