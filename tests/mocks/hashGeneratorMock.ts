export class HashGeneratorMock {
    public hash = async (s: string) => {
        return "hash"
    }

    public compareHash = async (s: string, hash: string): Promise<boolean> => {
        return s === hash
    }
} 