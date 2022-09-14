// Source: https://github.com/joe-bell/plaiceholder/blob/main/packages/plaiceholder/src/blurhash.ts#L8
type IGetBlurhashReturn = {
  hash: string;
} & Record<"width" | "height", number>;

// Source: https://github.com/joe-bell/plaiceholder/blob/main/packages/plaiceholder/src/get-image.ts#L62
type ILoadImageReturn = {
  src: string;
  height: number;
  width: number;
  type?: string;
  objectPosition?: string;
};

export interface AnimalAttributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean;
  special_needs: boolean;
  shots_current: boolean;
}

export interface AnimalBreed {
  primary: string;
  secondary: string | null;
  mixed: boolean;
  unknown: boolean;
}

export interface AnimalColor {
  primary: string;
  secondary: string | null;
  tertiary: string | null;
}

export interface AnimalContact {
  email: string;
  phone: string;
  address: {
    address1: string | null;
    address2: string | null;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}

export interface AnimalEnvironment {
  children: false;
  dogs: boolean;
  cats: boolean;
}

export interface AnimalPhoto {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface AnimalVideo {
  embed: string;
}

export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: AnimalBreed;
  colors: AnimalColor;
  age: "Baby" | "Young" | "Adult" | "Senior";
  gender: "Male" | "Female" | "Unknown";
  size: "Small" | "Medium" | "Large" | "Xlarge";
  coat: "Short" | "Medium" | "Long" | "Wire" | "Hairless" | "Curly";
  name: string;
  description: string;
  photos: AnimalPhoto[];
  videos: AnimalVideo[];
  status: "adoptable" | "adopted";
  attributes: AnimalAttributes;
  environment: AnimalEnvironment;
  tags: string[];
  contact: AnimalContact;
  published_at: string;
  distance: number;
  _links: {
    self: {
      href: string;
    };
    type: {
      href: string;
    };
    organization: {
      href: string;
    };
  };
}

export interface AnimalsRequestQuery {
  type?: string;
  breed?: string;
  size?: string;
  gender?: string;
  age?: string;
  color?: string;
  coat?: string;
  status?: "adoptable" | "adopted";
  name?: string;
  organization?: string;
  good_with_children?: boolean | 1 | 0;
  good_with_dogs?: boolean | 1 | 0;
  good_with_cats?: boolean | 1 | 0;
  house_trained?: true | 1;
  declawed?: true | 1;
  special_needs?: true | 1;
  location?: string;
  distance?: number;
  before?: string;
  after?: string;
  sort: "recent" | "-recent" | "distance" | "-distance" | "random";
  page?: number;
  limit?: number;
}

export interface AnimalTypeBreed {
  name: string;
  _links: {
    type: {
      href: string;
    };
  };
}

export interface AnimalType {
  id?: string;
  blurhash?: IGetBlurhashReturn;
  img?: ILoadImageReturn;
  name: string;
  coats: string[];
  colors: string[];
  genders: string[];
  breeds?: AnimalTypeBreed[];
  _links: {
    self: {
      href: string;
    };
    breeds: {
      href: string;
    };
  };
}

export interface AnimalResponse {
  animal: Animal;
}

export interface AnimalsResponse {
  animals: Animal[];
  pagination: {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
    _links: {};
  };
}

export interface AnimalTypeResponse {
  type: AnimalType;
}

export interface AnimalTypeBreedsResponse {
  breeds: AnimalTypeBreed[];
}

export interface AnimalTypesResponse {
  types: AnimalType[];
}

export interface TokenResponse {
  token_type: "Bearer";
  expires_in: 3600;
  access_token: string;
}
