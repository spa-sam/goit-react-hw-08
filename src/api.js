import axios from "axios";

const api = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const addRandomContacts = async (token) => {
  try {
    const contacts = generateRandomContacts(5);
    const promises = contacts.map((contact) =>
      api.post("/contacts", contact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    const responses = await Promise.all(promises);
    return responses.map((response) => response.data);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Функция для генерации случайных контактов
function generateRandomContacts(count) {
  const contacts = [];
  for (let i = 0; i < count; i++) {
    const name = generateRandomName();
    const number = generateRandomPhoneNumber();
    contacts.push({ name, number });
  }
  return contacts;
}

// Функция для генерации случайного имени
function generateRandomName() {
  const names = [
    "John",
    "Emma",
    "Michael",
    "Olivia",
    "William",
    "Ava",
    "James",
    "Sophia",
    "Benjamin",
    "Isabella",
    "Ethan",
    "Mia",
    "Alexander",
    "Charlotte",
    "Daniel",
    "Amelia",
    "Matthew",
    "Harper",
    "David",
    "Evelyn",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

// Функция для генерации случайного номера телефона
function generateRandomPhoneNumber() {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `${areaCode}-${prefix}-${lineNumber}`;
}

export default api;
