import { BandBusiness } from './../src/business/BandBusiness';
import { BandDataBase } from './../src/data/BandDataBase';
import { BandDataBaseMocks } from './mocks/BandDataBaseMock';
import { TokenGeneratorMock } from './mocks/tokenGeneratorMock';
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { HashGeneratorMock } from './mocks/hashGeneratorMock';


const bandBusinessMock = new BandBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(),
    new BandDataBaseMocks() as BandDataBase
)
// 'puxando' o bandBusiness do src onde estão todas as funções.


describe("Testing about band", () => {

    test("expecting error if it receives empty parameter", async () => {
        try {
            await bandBusinessMock.signupBand({
                name: "poesia acustica 2",
                music_genre: '',
                responsible: 'delacruz',
                auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNDRjNDExLTUyODItNDMyNi1hYTQ3LTc2ODIxYTNjMTQxMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzkwMTI5NiwiZXhwIjoxNjU3OTE5Mjk2fQ.f2OxEa-fFb9tiYW_p2sXsqMcbcgdFZpl6K1amKfa3U8'
            })
        } catch (error: any) {
            expect(error.message).toEqual("Fill in the fields correctly!")
        } finally {
            expect.assertions(1)
        }
    })

    test("Should return an error if id provided is invalid", async () => {
        try {
            await bandBusinessMock.getBandById({
                id: '',
                auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNDRjNDExLTUyODItNDMyNi1hYTQ3LTc2ODIxYTNjMTQxMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzkwMTI5NiwiZXhwIjoxNjU3OTE5Mjk2fQ.f2OxEa-fFb9tiYW_p2sXsqMcbcgdFZpl6K1amKfa3U8'
            })
        } catch (error: any) {
            expect(error.message).toEqual("Please, enter the band id you want to search!")
        } finally {
            expect.assertions(1)
        }
    })

    test("Success registering band", async () => {
        try {
            await bandBusinessMock.signupBand({
                name: "poesia acustica 2",
                music_genre: 'rap',
                responsible: 'delacruz',
                auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNDRjNDExLTUyODItNDMyNi1hYTQ3LTc2ODIxYTNjMTQxMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzkwMTI5NiwiZXhwIjoxNjU3OTE5Mjk2fQ.f2OxEa-fFb9tiYW_p2sXsqMcbcgdFZpl6K1amKfa3U8'
            })
        } catch (error: any) {

        }
    })



})
