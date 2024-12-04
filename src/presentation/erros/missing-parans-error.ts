export class MissisgParamError extends Error{
  constructor(paramName: string){
    super(`Missing param: ${paramName}`)
    this.name = 'MissisgParamError'
  }
}