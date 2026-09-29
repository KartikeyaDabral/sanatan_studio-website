// ============================================================
// Sanatan — Shared Domain Types
// ============================================================
// This package defines the canonical domain models used across
// the frontend, API, and admin applications. All business data
// flows through these types.
// ============================================================

// ---- Common ----

export type UUID = string;
export type ISODateString = string;
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
export type Slug = string;

export interface Timestamps {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// ---- User ----

export type UserRole = 'ADMIN' | 'CONTENT_EDITOR' | 'INVENTORY_MANAGER' | 'CUSTOMER';

export interface User extends Timestamps {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface Address extends Timestamps {
  id: UUID;
  userId: UUID;
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// ---- Architect ----

export interface Architect extends Timestamps {
  id: UUID;
  slug: Slug;
  name: string;
  firm?: string;
  bio?: string;
  portrait?: string;
  website?: string;
  location?: string;
}

// ---- Designer ----

export interface Designer extends Timestamps {
  id: UUID;
  slug: Slug;
  name: string;
  bio?: string;
  portrait?: string;
  website?: string;
  location?: string;
  specialty?: string;
}

// ---- Material ----

export interface Material extends Timestamps {
  id: UUID;
  slug: Slug;
  name: string;
  description?: string;
  image?: string;
  category?: string;
}

// ---- Project (Architecture) ----

export type ProjectStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Project extends Timestamps {
  id: UUID;
  slug: Slug;
  title: string;
  subtitle?: string;
  location: string;
  year: number;
  architectId?: UUID;
  architect?: Architect;
  designerId?: UUID;
  designer?: Designer;
  photographerName?: string;
  description: string;
  story?: string;
  coverImage: string;
  coverImageAlt?: string;
  featured: boolean;
  status: ProjectStatus;
  tags?: string[];
}

export interface ProjectImage extends Timestamps {
  id: UUID;
  projectId: UUID;
  url: string;
  altText?: string;
  caption?: string;
  sortOrder: number;
  width?: number;
  height?: number;
}

export interface ProjectRoom {
  id: UUID;
  projectId: UUID;
  name: string;
  description?: string;
  image?: string;
}

export interface ProjectMaterial {
  id: UUID;
  projectId: UUID;
  materialId: UUID;
  material?: Material;
  usage?: string;
}

export interface ProjectFurniture {
  id: UUID;
  projectId: UUID;
  productId: UUID;
  product?: ProductSummary;
  roomId?: UUID;
  room?: ProjectRoom;
  /** Hotspot position on source image (0-1 normalized) */
  hotspotX?: number;
  /** Hotspot position on source image (0-1 normalized) */
  hotspotY?: number;
  imageId?: UUID;
}

export interface ProjectDetail extends Project {
  images: ProjectImage[];
  rooms: ProjectRoom[];
  materials: ProjectMaterial[];
  furniture: ProjectFurniture[];
  relatedProjects?: ProjectSummary[];
}

export interface ProjectSummary {
  id: UUID;
  slug: Slug;
  title: string;
  subtitle?: string;
  location: string;
  year: number;
  coverImage: string;
  coverImageAlt?: string;
  architect?: Pick<Architect, 'name' | 'slug'>;
}

// ---- Category ----

export interface Category extends Timestamps {
  id: UUID;
  slug: Slug;
  name: string;
  description?: string;
  image?: string;
  parentId?: UUID;
  parent?: Category;
  productCount?: number;
}

// ---- Product ----

export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK';

export interface Product extends Timestamps {
  id: UUID;
  slug: Slug;
  title: string;
  description: string;
  story?: string;
  price: number;
  compareAtPrice?: number;
  currency: Currency;
  categoryId?: UUID;
  category?: Category;
  designerId?: UUID;
  designer?: Designer;
  manufacturerName?: string;
  status: ProductStatus;
  featured: boolean;
  tags?: string[];
}

export interface ProductImage {
  id: UUID;
  productId: UUID;
  url: string;
  altText?: string;
  sortOrder: number;
  width?: number;
  height?: number;
}

export interface ProductVariant extends Timestamps {
  id: UUID;
  productId: UUID;
  sku: string;
  label?: string;
  material?: string;
  color?: string;
  colorHex?: string;
  dimensions?: string;
  weight?: string;
  price: number;
  currency: Currency;
  inventory?: Inventory;
}

export interface ProductAsset3D extends Timestamps {
  id: UUID;
  productId: UUID;
  url: string;
  format: 'GLB' | 'GLTF';
  fileSize?: number;
  posterImage?: string;
}

export interface ProductDetail extends Product {
  images: ProductImage[];
  variants: ProductVariant[];
  asset3d?: ProductAsset3D;
  projects?: ProjectSummary[];
  relatedProducts?: ProductSummary[];
}

export interface ProductSummary {
  id: UUID;
  slug: Slug;
  title: string;
  price: number;
  currency: Currency;
  coverImage?: string;
  coverImageAlt?: string;
  designer?: Pick<Designer, 'name' | 'slug'>;
  category?: Pick<Category, 'name' | 'slug'>;
}

// ---- Collection ----

export interface Collection extends Timestamps {
  id: UUID;
  slug: Slug;
  name: string;
  description?: string;
  coverImage?: string;
  featured: boolean;
  productCount?: number;
}

export interface CollectionDetail extends Collection {
  products: ProductSummary[];
}

// ---- Inventory ----

export interface Inventory {
  id: UUID;
  variantId: UUID;
  quantity: number;
  reserved: number;
  warehouse?: string;
}

// ---- Cart ----

export interface Cart extends Timestamps {
  id: UUID;
  userId?: UUID;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  currency: Currency;
}

export interface CartItem {
  id: UUID;
  cartId: UUID;
  variantId: UUID;
  variant?: ProductVariant & { product?: ProductSummary };
  quantity: number;
  unitPrice: number;
  total: number;
}

// ---- Order ----

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Order extends Timestamps {
  id: UUID;
  userId: UUID;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: Currency;
  addressId: UUID;
  address?: Address;
  items: OrderItem[];
  payment?: Payment;
}

export interface OrderItem {
  id: UUID;
  orderId: UUID;
  variantId: UUID;
  variant?: ProductVariant & { product?: ProductSummary };
  quantity: number;
  unitPrice: number;
  total: number;
}

// ---- Payment ----

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Payment extends Timestamps {
  id: UUID;
  orderId: UUID;
  provider: string;
  providerPaymentId?: string;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
}

// ---- Wishlist ----

export interface WishlistItem extends Timestamps {
  id: UUID;
  userId: UUID;
  productId: UUID;
  product?: ProductSummary;
}

// ---- Review ----

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Review extends Timestamps {
  id: UUID;
  userId: UUID;
  user?: Pick<User, 'firstName' | 'lastName' | 'avatar'>;
  productId: UUID;
  rating: number;
  title?: string;
  body?: string;
  status: ReviewStatus;
}

// ---- API ----

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ProductFilterParams extends PaginationParams {
  category?: Slug;
  collection?: Slug;
  designer?: Slug;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'featured';
  search?: string;
}

export interface ProjectFilterParams extends PaginationParams {
  architect?: Slug;
  designer?: Slug;
  year?: number;
  location?: string;
  sort?: 'newest' | 'oldest' | 'featured';
  search?: string;
}
