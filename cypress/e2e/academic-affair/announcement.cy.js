const { slowCypressDown } = require("cypress-slow-down")

slowCypressDown(300);

describe('Testing Announcement Page User Interface', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test="username-input"]').type('AnhThu16');
    cy.get('[data-test="password-input"]').type('aU_0wtwgz60ja0m');
    cy.get('[data-test="login-button"]').click();
    cy.wait(200);
    cy.get('.nav-item').contains('Announcement').click();
    cy.wait(200);
  })

  it('Testing visibility of all content', () => {
    cy.get('#default-search').should('be.visible');
    cy.get('#create-button').should('be.visible');
    cy.get('#delete-button').should('be.visible');
    cy.get('.mt-48').should('contain', 'Please select an announcement to view');
    cy.get('[data-test="announcement-card"]').should('be.visible');
  })

  it('Testing view announcement functionality', () => {
    cy.get('[data-test="announcement-title"]').should('not.exist');
    cy.get('[data-test="announcement-content"]').should('not.exist');
    cy.get('[data-test="announcement-created-at"]').should('not.exist');
    cy.get('[data-test="announcement-last-modified"]').should('not.exist');

    cy.get(':nth-child(1) > [data-test="announcement-card"] > .bg-white').click();

    cy.get('[data-test="announcement-title"]').should('be.visible');
    cy.get('[data-test="announcement-content"]').should('be.visible');
    cy.get('[data-test="announcement-created-at"]').should('be.visible');
    cy.get('[data-test="announcement-last-modified"]').should('be.visible');
  })

  it('Testing search announcement functionality', () => {
    
  })

  it('Testing infinite scroll functionality', () => {
    cy.get('[data-test="announcement-card"]').should('have.length.greaterThan', 5)
    .then(cards => {
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 2)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 3)
      
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 4)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 5)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
    })
  })

  it('Testing add new announcement functionality', () => {
    cy.get('#create-button').click();
    cy.url().should('include', '/create-announcement')

    cy.get('#title').type('Thông báo mới được tạo');
    cy.get('#content').type('<insert Nội dung thông báo>');
    cy.get('#isPublic').check();
    cy.get('[data-test="confirm-button"]').click();
  })

  it('Testing edit announcement functionality', () => {
    cy.get('[data-test="announcement-card"]').should('have.length.greaterThan', 5)
    .then(cards => {
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 2)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 3)
      
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 4)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 5)

      cy.get('#scrollableAnnouncementDiv').scrollTo(0, 10000)
    })

    cy.get('[data-test="announcement-card-50"] [data-test="edit-button"]').click();
    cy.url().should('include', '/update-announcement')
    cy.get('#title').clear()
    cy.get('#title').type('Thông báo đã được sửa đổi lần đầu tiên')
    cy.get('#content').clear()
    cy.get('#content').type('<insert Nội dung thông báo đã được sửa đổi>')
    cy.get('[data-test="update-button"]').click();
  })

  it('Testing delete announcement functionality', () => {
    cy.get('[data-test="announcement-card"]').should('have.length.greaterThan', 5)
    .then(cards => {
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 2)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 3)
      
      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 4)

      cy.get('#scrollableAnnouncementDiv').scrollTo('bottom')
      cy.get('[data-test="announcement-card"]').should('have.length', cards.length * 5)

      cy.get('#scrollableAnnouncementDiv').scrollTo(0, 10000)
    })

    cy.get('[data-test="announcement-card-50"] input[type="checkbox"]').click();
    cy.get('#delete-button').click();
    cy.get('[data-test="confirm-button"]').click();
  })
})