# Airline Management

The Airline Management project aims to streamline flight scheduling and seat reservations. The app will provide features such as personalized booking options to enhance the travel experience for users.


## Getting Started

Install project with npm

```bash
  npm install
```
Run the application:
```bash
  npm start
``` 
Open http://localhost:3000 with your browser to see the result.
## API Reference

#### Get all items

```http
  GET/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET/item/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/)

To learn React, check out the [React documentation](https://react.dev/)
