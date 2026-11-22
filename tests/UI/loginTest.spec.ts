import { randomUUID } from 'crypto';
import { UserApi } from '../../api/UserApis';
import { test, expect } from '../../fixtures/userFixture';
import { LoginPage } from '../../pages/LoginPage';

test.describe('test login with username and password via UI', () => {
    let loginPage: LoginPage;
    let email = "";
    let password = "";
    const wrongEmail = `Pw@${randomUUID().slice(0, 8)}A2`;
    const wrongUser = `test_${randomUUID()}`;

    test.beforeAll(async ({ request }) => {
        const userApi = new UserApi(request);
        email = `test_${randomUUID()}@abc.com`;
        password = `Pw@${randomUUID().slice(0, 8)}A1`;
        const newUserData = {     
            first_name: "John",
            last_name: "Smith",
            address: {
              street: "Street 1",
              house_number: "12",
              city: "City",
              state: "State",
              country: "Country",
              postal_code: "1234AA"
            },
            phone: "0987654321",
            dob: "1970-01-01",
            password: password,
            email: email
          }
    
        const registerRes = await userApi.createNewUser(newUserData);
        expect(registerRes.status()).toBe(201);
        });
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        });

    test('testcase1, login successful with valid user and password', async({ page}) => {
        await loginPage.login(email,password);
        await expect(page).toHaveURL(/\/account/);
        const userNameBtn = page.getByTestId('nav-menu');
        await expect(userNameBtn).toHaveText('John Smith');

    });

    test('testcase2, login failed with incorrect password', async({ page}) => {
        await loginPage.login(email, wrongEmail);
        const errorMessage = page.locator('.alert.alert-danger');
        await expect(errorMessage).toHaveText('Invalid email or password');
    });

    test('testcase3, login failed with empty email', async({ page}) => {
        await loginPage.login("", email);
        const emailErrMsg = page.getByTestId('email-error');
        await expect(emailErrMsg).toHaveText('Email is required');
    });

    test('testcase4, login failed with incorrect email format', async({ page}) => {
        await loginPage.login(wrongUser, email);
        const emailErrMsg = page.getByTestId('email-error');
        await expect(emailErrMsg).toHaveText('Email format is invalid');
    });

})