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



test('Llenado de datos Checkout', async ({ page }) => {

//Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();
  

//Click en el icono de carrito
  await page.locator('.shopping_cart_link').click()

//Verificar que se ingreso a la pagina de Cart
  await expect(page).toHaveURL(/.*cart.html/); 

//Hacer clic en el botón Checkout
await page.getByRole('button', {name:'Checkout'}).click()

//Llenar formulario
await page.locator('#first-name').fill('Maribel')
await page.locator('#last-name').fill('Pérez')
await page.locator('#postal-code').fill('520002')

//Hacer clic en el botón Continuar
await page.getByRole('button', {name:'Continue'}).click()

//Redireccionamiento a la pagina de resumen
await expect(page).toHaveURL(/.*checkout-step-two.html/);

});



test('Flujo completo de compra', async ({ page }) => {

//Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();
  
//Adicionar producto al carrito
  const producto = page.locator('.inventory_item:has-text("Sauce Labs Bike Light")');
  await expect(producto).toBeVisible();
  await producto.locator('//button[@name="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(producto.getByRole('button', { name: 'Remove' })).toBeVisible();
  
  const contadorProductos = page.locator('.shopping_cart_badge');
  await expect(contadorProductos).toHaveText('1');

//Click en el icono de carrito
  await page.locator('.shopping_cart_link').click()

//Verificar que se ingreso a la pagina de Cart
  await expect(page).toHaveURL(/.*cart.html/); 

//Hacer clic en el botón Checkout
await page.getByRole('button', {name:'Checkout'}).click()

//Llenar formulario
await page.locator('#first-name').fill('Maribel')
await page.locator('#last-name').fill('Pérez')
await page.locator('#postal-code').fill('520002')

//Hacer clic en el botón Continuar
await page.getByRole('button', {name:'Continue'}).click()

//Redireccionamiento a la pagina de resumen
await expect(page).toHaveURL(/.*checkout-step-two.html/);


//Finalizar flujo de compra
await page.getByRole('button', {name:'Finish'}).click()

//Verificar visualización de mensaje
const mensajeConfirmacion = page.locator('//h2[@data-test="complete-header"]');
await expect(mensajeConfirmacion).toHaveText(/Thank you for your/i)

});

test('Ordenar productos', async ({ page }) => {
// iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('#login-button').click()

//Redireccionamiento a lista de productos
  await expect(page).toHaveURL(/.*inventory.html/); 

//Selecciona opción del filtro
await page.getByRole('combobox').selectOption('lohi');

// Capturar todos los precios mostrados
  const preciosText = await page.locator('.inventory_item_price').allTextContents();

// Convertir los precios de string a número (eliminando el signo $)
  const preciosNumericos = preciosText.map(texto => parseFloat(texto.replace('$', '')));
  console.log('Precios numéricos:', preciosNumericos);

// Validar que estén ordenados de menor a mayor
  for (let i = 0; i < preciosNumericos.length - 1; i++) {
    expect(preciosNumericos[i]).toBeLessThanOrEqual(preciosNumericos[i + 1]);
  }

});

test('Validar detalles del producto', async ({ page }) => {
//Iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

//Redireccionamiento a lista de productos
  await expect(page).toHaveURL(/.*inventory.html/); 

//Capturo la lista de productos y el total
  const productos = await page.locator('.inventory_item').all();
  console.log(`Total de productos: ${productos.length}`);

// Capturo los nombres, descripciones y precios de los productos
  const item_name = await page.locator('.inventory_item_name').allTextContents();
  const item_desc = await page.locator('.inventory_item_desc').allTextContents();
  const item_price = await page.locator('.inventory_item_price').allTextContents();

  // Imprimir los detalles de cada producto
  for (let i = 0; i < item_name.length; i++) {
    console.log(`Producto ${i + 1}:`);
    console.log('Nombre:', item_name[i]);
    console.log('Descripción:', item_desc[i]);
    console.log('Precio:', item_price[i]);
  }

});







