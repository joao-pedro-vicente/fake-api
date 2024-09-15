"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let users = [];
let nextId = 1;
app.get('/users', (req, res) => {
    res.json(users);
});
app.post('/users', (req, res) => {
    const { name, email, picture, password } = req.body;
    const newUser = { id: nextId++, name, email, picture, password };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        const updatedUser = Object.assign(Object.assign({}, users[userIndex]), req.body);
        users[userIndex] = updatedUser;
        res.json(updatedUser);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Falsa API rodando na porta ${PORT}`);
});
