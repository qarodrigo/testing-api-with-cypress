/// <reference types="cypress" />

const faker = require('faker')

describe('testing posts endpoint', () => {
    
    it('getting a single post', () => {
        cy.request('/posts/1').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('title')
            expect(response.body).to.have.property('body')
            expect(response.body).to.have.property('userId')
            expect(response.duration).to.lessThan(60) // in ms
        })
    })

    it('creating a post', () => {

        let post = {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
        }

        cy.request({
            method: 'POST',
            url: 'posts',
            body: {
                title: post.title,
                body: post.body,
                userId: 1
            }

        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('title', post.title)
            expect(response.body).to.have.property('body', post.body)
            expect(response.body).to.have.property('userId')
        })
    })

})