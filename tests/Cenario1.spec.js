// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Recuperar conta', () => {

  test.beforeEach(async ({ page }) => {
    let C = 1;
    const sEsqueciSenha = page.getByRole('link', { name: 'Esqueci minha senha'});
    const sToken = page.getByRole('button', { name: 'Solicitar token'});
    
    console.log('Acessando aba "Esqueci minha senha"');
    await page.goto('https://nuvem.alterdata.com.br/');
    await sEsqueciSenha.click();
    while (C <= 3){
      if (await sToken.isVisible()) {
        break;
      }
      else{
        console.log('Objeto não encontrado, executando ' + C + 'o. tentativa.');
        C = C + 1; 
      }  
    }
  });

  /* test('Solicitação de Token - Usuário existente', async ({ page }) => {
    const sInput = page.getByPlaceholder('Código.Nome ex:123456.Pedro');
    const sToken = page.getByRole('button', { name: 'Solicitar token'});

    await sInput.fill('igorfelix.sup.shop');
    await sToken.click();
  });*/

  test('Solicitação de Token - Usuário inexistente', async ({ page }) => {
    const sInput = page.getByPlaceholder('Código.Nome ex:123456.Pedro');
    const sToken = page.getByRole('button', { name: 'Solicitar token'});

    await sInput.fill('igorfelix.sup');
    await sToken.click();
    await expect(page.getByText('Usuário não encontrado.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'OK'})).toBeEnabled();
  });
});