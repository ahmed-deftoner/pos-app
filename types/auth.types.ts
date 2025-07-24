export type SquareProviderOptions = {
  clientId: string;
  clientSecret: string;
  authorization: {
    params: {
      scope: string;
    };
  };
};

export type TokenContext = {
  params: {
    code: string;
  };
};

export type SquareProfile = {
  id: string;
  businessName?: string;
};
