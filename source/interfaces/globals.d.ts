declare const Bun: {
  password: {
    hash(password: string, method: string): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
  };
};

