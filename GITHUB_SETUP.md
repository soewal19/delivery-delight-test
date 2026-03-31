# Загрузка проекта на GitHub

## Вариант 1: Через GitHub CLI (gh)

1. Авторизуйтесь в GitHub CLI:
```bash
gh auth login
```

2. Создайте репозиторий и загрузите код:
```bash
gh repo create delivery-delight --public --source=. --remote=origin --push
```

## Вариант 2: Через веб-интерфейс GitHub

1. Перейдите на https://github.com/new
2. Создайте новый репозиторий с именем `delivery-delight`
3. Выполните следующие команды:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/delivery-delight.git
git branch -M main
git push -u origin main
```

## Вариант 3: Через GitHub Desktop

1. Откройте GitHub Desktop
2. File → Add Local Repository
3. Выберите папку проекта
4. Нажмите "Publish repository"
5. Укажите имя `delivery-delight` и нажмите "Publish"

## После загрузки

Ваш репозиторий будет доступен по адресу:
https://github.com/ВАШ_ЛОГИН/delivery-delight
