export type _booleanHash = { [key: string]: boolean };

export type PlayerQuery = {

  term: string;

  roles: string[];

  _roles: _booleanHash;

  status: string;

};
