import { test, expect } from '@playwright/test';

test('Login exitoso', async ({ page }) => {
/*
--Validar que un usuario se loguea exitosamente
PASOS
1 ingresar a la web
2 ingresar el username correcto
3 ingresar la password correcta
4 hacer click en el botón Login

RESULTADO ESPERADO
debe reedirigirse a la pagina inventory.html y visualizar la lista de productos
*/
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('standard_user')
  await page.locator('//input[@id="password"]').fill('secret_sauce')
  await page.locator('//input[@id="login-button"]').click()
  //await expect(page.locator('//div[@id="shopping_cart_container"]')).toBeVisible()
  await expect(page).toHaveURL(/.*inventory.html/); //Redireccionamiento
});

test('Login fallido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('error_user')
  await page.locator('//input[@id="password"]').fill('1234')
  await page.locator('//input[@id="login-button"]').click()
  const mensajeError = page.locator('//h3[@data-test="error"]');
  await expect(mensajeError).toBeVisible();
  await expect(mensajeError).toHaveText(/Epic sadface: Username and password do not match/i); //.toHaveText() con una expresión regular (/.../i) para no preocuparte por mayúsculas o detalles exactos del texto.
});


test('Agregar un producto al carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();
  
  const producto = page.locator('.inventory_item:has-text("Sauce Labs Bike Light")');
  await expect(producto).toBeVisible();
  await producto.locator('//button[@name="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(producto.getByRole('button', { name: 'Remove' })).toBeVisible();
  
  const contadorProductos = page.locator('.shopping_cart_badge');
  await expect(contadorProductos).toHaveText('1');
});

test('Eliminar un producto del carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();
  
  const producto = page.locator('.inventory_item:has-text("Sauce Labs Bike Light")');
  await expect(producto).toBeVisible();
  await producto.locator('//button[@name="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(producto.getByRole('button', { name: 'Remove' })).toBeVisible();
  
  const contadorProductos = page.locator('.shopping_cart_badge');
  await expect(contadorProductos).toHaveText('1');

  await producto.getByRole('button', { name: 'Remove' }).click()

});

test('Navegar a carrito', async ({ page }) => {
//Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('#login-button').click()

//Verificar que se abre la pagina de inventory
  await expect(page).toHaveURL(/.*inventory.html/); //Redireccionamiento

//Click en el icono de carrito
  await page.locator('.shopping_cart_link').click()

//Verificar que se ingreso a la pagina de Cart
  await expect(page).toHaveURL(/.*cart.html/); //Redireccionamiento a carrito

});





