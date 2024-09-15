import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

interface User {
  id: number;
  name: string;
  email: string;
  picture?: string;
  password: string;
}

let users: User[] = [];
let nextId = 1;

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.post('/users', (req: Request, res: Response) => {
  const { name, email, picture, password } = req.body;
  const newUser: User = { id: nextId++, name, email, picture, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.json({ token: 'fake-jwt-token', user });
  } else {
    res.sendStatus(401);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Falsa API rodando na porta ${PORT}`);
});
