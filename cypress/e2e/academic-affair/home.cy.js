describe('Testing Home Page User Interface', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(2) > .border-2').type('SonQuan41');
    cy.get(':nth-child(3) > .border-2').type('GMPsz2es2BPGPcn');
    cy.get('.bg-blue-700').click();
  })

  it('Testing visibility of content', () => {
    cy.get('[data-test="main-page-card"]').should('be.visible');
    cy.get('[data-test="project-management-card"]').should('be.visible');
    cy.get('[data-test="announcement-management-card"]').should('be.visible');
    cy.get('[data-test="score-management-card"]').should('be.visible');
    cy.get('[data-test="analysis-management-card"]').should('be.visible');
  })

  it('Testing project link of main page card', () => {
    cy.get('[data-test="project-link"]').contains('Quản lý danh sách đồ án');
    cy.get('[data-test="project-link"]').should('have.attr', 'href').and('equal','/#project');
    cy.get('[data-test="project-link"]').click();
    cy.url().should('include', '/#project');
  })

  it('Testing announcement link of main page card', () => {
    cy.get('[data-test="announcement-link"]').contains('Quản lý danh sách thông báo');
    cy.get('[data-test="announcement-link"]').should('have.attr', 'href').and('equal','/#announcement');
    cy.get('[data-test="announcement-link"]').click();
    cy.url().should('include', '/#announcement');
  })

  it('Testing score link of main page card', () => {
    cy.get('[data-test="score-link"]').contains('Quản lý điểm số sinh viên');
    cy.get('[data-test="score-link"]').should('have.attr', 'href').and('equal','/#score');
    cy.get('[data-test="score-link"]').click();
    cy.url().should('include', '/#score');
  })

  it('Testing analysis link of main page card', () => {
  cy.get('[data-test="analysis-link"]').contains('Quản lý báo cáo, thống kê');
  cy.get('[data-test="analysis-link"]').should('have.attr', 'href').and('equal','/#analysis');
  cy.get('[data-test="analysis-link"]').click();
  cy.url().should('include', '/#analysis');
  })
  
  it('Testing title of content', () => {
    cy.get('#project').contains('1. QUẢN LÝ DANH SÁCH ĐỒ ÁN');
    cy.get('#announcement').contains('2. QUẢN LÝ DANH SÁCH THÔNG BÁO');
    cy.get('#score').contains('3. QUẢN LÝ ĐIỂM SỐ SINH VIÊN');
    cy.get('#analysis').contains('4. QUẢN LÝ BÁO CÁO, THỐNG KÊ');
  })

  it('Testing navbar functionality', () => {
    cy.get('a[href="/academic-affair/project/view-project"]').click();
    cy.url().should('include', '/academic-affair/project/view-project');

    cy.get('a[href="/academic-affair/announcement/view-announcement"]').click();
    cy.url().should('include', '/academic-affair/announcement/view-announcement');

    cy.get('a[href="/academic-affair/score/view-score"]').click();
    cy.url().should('include', '/academic-affair/score/view-score');

    cy.get('a[href="/academic-affair/analysis/view-analysis"]').click();
    cy.url().should('include', '/academic-affair/analysis/view-analysis');
  })
})