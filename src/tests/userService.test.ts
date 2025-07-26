import { prisma } from '../config/Prisma';
import * as userService from '../services/userService';
import { AuthError, NotFoundError, UserExistsError } from '../utils/erros';

describe('Testing user service', () => {
    const userData = {
        nome: 'Teste',
        email: 'email@teste.com',
        senha: '123456',
    }

    beforeEach(async () => {
        await prisma.usuario.deleteMany();

    });


    it('should create a new user', async () => {
        const newUser = await userService.createUser(userData);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(userData.email);
    });

    it('should not allow to create a user with existing email', async () => {
        const newUser = await userService.createUser(userData);
        await expect(userService.createUser(userData)).rejects.toBeInstanceOf(UserExistsError);
    });

    it('should user login', async () => {
        await userService.createUser(userData);
        const result = await userService.loginUser({
            email: userData.email,
            senha: userData.senha
        });
        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('token');
        expect(result.user.email).toBe(userData.email);
        expect(result.user.nome).toBe(userData.nome);

    })

    it('should throw error when user not found', async () => {
        await expect(userService.loginUser({
            email: 'inexistente@email.com',
            senha: '123456'
        })).rejects.toBeInstanceOf(NotFoundError);
    });

    it('should throw error when password is wrong', async () => {
        await userService.createUser(userData);

        await expect(userService.loginUser({
            email: userData.email,
            senha: 'senhaerrada'
        })).rejects.toBeInstanceOf(AuthError);
    });
})