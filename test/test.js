const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN

it('Response should return all colors', () => {
  return chai.request(app)
    .get('/colors')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
     // expect(res.body.results)
    })
});

it('Response should be 404 if URL is incorrect with a bad GET request', () => {
  return chai.request(app)
    .get('/colors')
    .catch((err) => {
      expect(err).to.have.status(404);
    });
})

it('Response should add new color', () => {
  return chai.request(app)
    .post('/colors')
    .send(payloadColor('yellow'))
    .then((res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      expect(res.body.results).to.include(getCurrentCulor());
    })
});

it('Response should return new color list Request', () => {
  return chai.request(app)
    .get('/colors')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      expect(res.body.results).to.be.an('array');
    })
});