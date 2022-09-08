// import { v4 } from 'uuid'

// // função para gerar o id.

// export class IdGenerator {
//     generateId = (): string => v4()
// } 


import { v4 } from "uuid";

export class IdGenerator {
  public generateId(): string {
    return v4();
  }
}

export default new IdGenerator()