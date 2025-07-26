import { prisma } from '../config/Prisma';
import * as filmeService from '../services/filmeService';

describe('Testing filme service', () => {
    const baseFilme = {
        titulo: 'Filme Teste',
        descricao: 'Descrição do filme teste',
        genero: 'Ação',
        anoLancamento: 2023,
        duracao: 120,
        imagemUrl: 'https://exemplo.com/imagem.jpg',
        classificacao: 12,
        idioma: 'Português'
    };

    const criarFilme = (dados = {}) => filmeService.addFilme({ ...baseFilme, ...dados });

    beforeEach(async () => {
        await prisma.filme.deleteMany({});
    });

    describe('getFilmes', () => {
        
        it('should list all films', async () => {
            await criarFilme();
            await criarFilme({ titulo: 'Filme 2' });

            const filmes = await filmeService.getFilmes(1, 10, '', '', 0);

            expect(filmes).toHaveLength(2);
        });

        it('should list films with pagination', async () => {
            for (let i = 1; i <= 5; i++) {
                await criarFilme({ titulo: `Filme ${i}` });
            }

            const pagina1 = await filmeService.getFilmes(1, 3, '', '', 0);
            const pagina2 = await filmeService.getFilmes(2, 3, '', '', 0);

            expect(pagina1).toHaveLength(3);
            expect(pagina2).toHaveLength(2);
        });

        it('should filter films by title', async () => {
            await criarFilme({ titulo: 'Batman' });
            await criarFilme({ titulo: 'Superman' });

            const filmes = await filmeService.getFilmes(1, 10, 'Batman', '', 0);

            expect(filmes).toHaveLength(1);
            expect(filmes[0].titulo).toBe('Batman');
        });

        it('should filter films by genre', async () => {
            await criarFilme({ titulo: 'Filme Ação', genero: 'Ação' });
            await criarFilme({ titulo: 'Filme Comédia', genero: 'Comédia' });

            const filmes = await filmeService.getFilmes(1, 10, '', 'Ação', 0);

            expect(filmes).toHaveLength(1);
            expect(filmes[0].genero).toBe('Ação');
        });

        it('should filter films by year', async () => {
            await criarFilme({ titulo: 'Filme 2023', anoLancamento: 2023 });
            await criarFilme({ titulo: 'Filme 2022', anoLancamento: 2022 });

            const filmes = await filmeService.getFilmes(1, 10, '', '', 2023);

            expect(filmes).toHaveLength(1);
            expect(filmes[0].anoLancamento).toBe(2023);
        });

        it('should return empty array when no films found', async () => {
            const filmes = await filmeService.getFilmes(1, 10, '', '', 0);

            expect(filmes).toHaveLength(0);
        });
    });

    describe('getFilmeById', () => {
        it('should find film by id', async () => {
            const filmeCriado = await criarFilme();

            const filme = await filmeService.getFilmeById(filmeCriado.id);

            expect(filme).toEqual(filmeCriado);
        });

        it('should throw error when film not found', async () => {
            await expect(filmeService.getFilmeById(999)).rejects.toThrow('Filme com ID 999 não encontrado');
        });
    });

    describe('addFilme', () => {
        it('should create new film', async () => {
            const filme = await criarFilme();

            expect(filme).toHaveProperty('id');
            expect(filme.titulo).toBe(baseFilme.titulo);
        });

        it('should throw error when film with same title exists', async () => {
            await criarFilme();

            await expect(criarFilme()).rejects.toThrow('Filme com título "Filme Teste" já existe');
        });
    });

    describe('updateFilme', () => {
        it('should update existing film', async () => {
            const filmeCriado = await criarFilme();

            const resultado = await filmeService.updateFilme(filmeCriado.id, {
                ...baseFilme,
                titulo: 'Filme Atualizado'
            });

            expect(resultado.filme.titulo).toBe('Filme Atualizado');
        });

        it('should throw error when film not found', async () => {
            await expect(filmeService.updateFilme(999, baseFilme)).rejects.toThrow('Filme com ID 999 não encontrado');
        });
    });

    describe('deleteFilme', () => {
        it('should delete existing film', async () => {
            const filmeCriado = await criarFilme();

            const resultado = await filmeService.deleteFilme(filmeCriado.id);

            expect(resultado.message).toContain('excluído com sucesso');
            await expect(filmeService.getFilmeById(filmeCriado.id)).rejects.toThrow();
        });

        it('should throw error when film not found', async () => {
            await expect(filmeService.deleteFilme(999)).rejects.toThrow('Filme com ID 999 não encontrado');
        });
    });
});