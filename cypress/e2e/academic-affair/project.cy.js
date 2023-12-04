import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown(300);

describe('Testing Project Page User Interface ', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test="username-input"]').type('SonQuan41');
    cy.get('[data-test="password-input"]').type('GMPsz2es2BPGPcn');
    cy.get('[data-test="login-button"]').click();
    cy.wait(200);
    cy.get('.nav-item').contains('Project').click();
  })

  it('Testing visibility of project card', () => {
    cy.get('input[type="checkbox"]').should('be.visible');

    cy.get('div[class="font-bold text-base text-blue-700"]').should('be.visible');

    cy.get('div[class="col-span-2 text-base"]').should('be.visible');

    cy.get('div[class="bg-sky-100 text-sky-700 rounded-3xl flex justify-center items-center py-1 px-3"]').should('be.visible').and('contain', 'Đồ án 2'); 
    cy.get('div[class="bg-blue-200 text-blue-700 rounded-3xl flex justify-center items-center py-1 px-3"]').should('be.visible').and('contain', 'Đồ án 1');

    cy.get('div[class="bg-blue-50 text-blue-700 rounded-3xl flex justify-center items-center py-1 px-3"]').should('be.visible').and('contain', 'Registered');
    cy.get('div[class="bg-red-50 text-red-700 rounded-3xl flex justify-center items-center py-1 px-3"]').should('be.visible').and('contain', 'Unregistered');

    cy.get('div[class="col-span-3 text-base flex items-center w-full"]').should('be.visible');

    cy.get('[data-test="edit-button"]').should('be.visible').and('have.attr', 'href').and('contain', '/academic-affair/project/update-project/');
  })

  it('Testing functionality of project modal', () => {
    //testing viewing project modal
    cy.get('[data-test="1"]').click();
    cy.get('[data-test="view-project-modal"]').should('be.visible');

    //testing visibility of project information
    cy.get('span').contains('Requirement').should('be.visible');
    cy.get('span').contains('Faculty').should('be.visible');
    cy.get('span').contains('Type').should('be.visible');
    cy.get('span').contains('Register status').should('be.visible');

    //testing visibility of teacher information
    cy.get('legend').contains("Teacher's Information").should('be.visible');
    cy.get('span').contains('Name').should('be.visible');  
    cy.get('span').contains('Email').should('be.visible');
    cy.get('span').contains('Phone').should('be.visible');

    //testing back button in modal
    cy.get('button').contains('Back').click();
  })

  it('Testing search bar functionality', () => {
    cy.get('input[id="default-search"]').type('Xay dung');
    cy.get('button[id="search-button"]').click();

    cy.get('[data-test="0"] div[class="font-bold text-base text-blue-700"]').should('contain', 'Xây dựng');

    cy.get('input[id="default-search"]').clear();
  })

  it('Testing add new project functionality', () => {
    cy.get('#create-button').click();
    cy.url().should('include', '/create-project');

    cy.get('#name').type('Dự án mới được tạo');
    cy.get('#faculty').select('Công nghệ Phần Mềm');
    cy.get('#project-type').select('1');
    cy.get('#teacher-name').select('Vương Tú Sương');
    cy.get(':nth-child(2) > #teacher-info').invoke('val').should('equal', 'TuSuong89@hotmail.com');
    cy.get(':nth-child(3) > #teacher-info').invoke('val').should('equal', '0298 6621 0926');
    
    cy.get('[data-test="create-button"]').click();

    cy.get('#default-search').type('Dự án mới được tạo');
    cy.get('#search-button').click();

    cy.get('[data-test="0"]').click();
  })

  it('Testing edit project functionality', () => {
    cy.get('#default-search').type('Dự án mới được tạo');
    cy.get('#search-button').click();

    cy.get('[data-test="edit-button"]').click();
    cy.url().should('include', '/update-project');

    cy.get('#name').clear();
    cy.get('#name').type('Dự án đang được cập nhật');
    cy.get('#faculty').select('Khoa học Máy tính');
    cy.get('#project-type').select('2');
    cy.get('#teacher-name').select('Tô Hiền Mai');
    cy.get('#requirement').type('Đã được sửa đổi 1 lần.');
    
    cy.get('[data-test="update-button"]').click();

    cy.get('#default-search').type('Dự án đang được cập nhật');
    cy.get('#search-button').click();

    cy.get('[data-test="0"]').click();
  })

  it('Testing delete existing project functionality', () => {
    cy.get('#default-search').type('Dự án đang được cập nhật');
    cy.get('#search-button').click();

    cy.get('.w-5').check();
    cy.get('#delete-button').click();
    cy.get('[data-test="confirm-button"]').click();

    cy.get('#search-button').click();
  })
})