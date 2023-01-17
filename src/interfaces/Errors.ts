export interface HeseyaBaseError {
  message: string
  key: HeseyaGeneralErrorCode | HeseyaServerErrorCode
  code: number
}

export interface HeseyaValidationSubErrors {
  [field_name: string]: {
    key: HeseyaValidationErrorCode
    message: string
    min?: number
    max?: number
    table?: string
    field?: string
    size?: number
    types?: string[]
    when?: string // Date
    value?: unknown
  }[]
}

export interface HeseyaValidationError {
  message: string
  key: 'VALIDATION_ERROR'
  code: 422
  errors: HeseyaValidationSubErrors
}

export interface HeseyaClientError {
  message: string
  key: HeseyaClientErrorCode
  code: number
  errors: {
    type?: string
    id?: string
    method?: string
  }
}

export type HeseyaError = HeseyaBaseError | HeseyaValidationError | HeseyaClientError

//?----------------------------------------------------------------------------

export interface HeseyaErrorResponse {
  error: HeseyaError
}

//?----------------------------------------------------------------------------

export enum HeseyaGeneralErrorCode {
  NotFound = 'NOT_FOUND',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  Unauthorized = 'UNAUTHORIZED',
  Forbidden = 'FORBIDDEN',
  UnprocessableEntity = 'UNPROCESSABLE_ENTITY',
  BadRequest = 'BAD_REQUEST',
  BadGateway = 'BAD_GATEWAY',
}

export enum HeseyaValidationErrorCode {
  Required = 'VALIDATION_REQUIRED',
  String = 'VALIDATION_STRING',
  Numberic = 'VALIDATION_NUMERIC',
  Array = 'VALIDATION_ARRAY',
  Min = 'VALIDATION_MIN',
  Max = 'VALIDATION_MAX',
  Beween = 'VALIDATION_BETWEEN',
  Digits = 'VALIDATION_DIGITS',
  Alpha = 'VALIDATION_ALPHA',
  Date = 'VALIDATION_DATE',
  Email = 'VALIDATION_EMAIL',
  Exists = 'VALIDATION_EXISTS',
  File = 'VALIDATION_FILE',
  Regex = 'VALIDATION_REGEX',
  Size = 'VALIDATION_SIZE',
  Unique = 'VALIDATION_UNIQUE',
  Boolean = 'VALIDATION_BOOLEAN',
  Url = 'VALIDATION_URL',
  Uuid = 'VALIDATION_UUID',
  PasswordLength = 'VALIDATION_PASSWORD_LENGTH',
  PasswordCompromised = 'VALIDATION_PASSWORD_COMPROMISED',
  Distinct = 'VALIDATION_DISTINCT',
  In = 'VALIDATION_IN',
  Present = 'VALIDATION_PRESENT',
  Integer = 'VALIDATION_INTEGER',
  Filled = 'VALIDATION_FILLED',
  AlphaDash = 'VALIDATION_ALPHA_DASH',
  Mimetypes = 'VALIDATION_MIMETYPES',
  BeforeOrEqual = 'VALIDATION_BEFORE_OR_EQUAL',
  RequiredWith = 'VALIDATION_REQUIRED_WITH',
  UniqueIdInRequest = 'VALIDATION_UNIQUE_ID_IN_REQUEST',
  AppUniqueId = 'VALIDATION_APP_UNIQUE_ID',
  AttributeOptionExists = 'VALIDATION_ATTRIBUTE_OPTION_EXISTS',
  CanShowPrivateMetadata = 'VALIDATION_CAN_SHOW_PRIVATE_METADATA',
  ConsentExists = 'VALIDATION_CONSENT_EXISTS',
  Decimal = 'VALIDATION_DECIMAL',
  EnumKey = 'VALIDATION_ENUM_KEY',
  EventExists = 'VALIDATION_EVENT_EXISTS',
  OptionAvailable = 'VALIDATION_OPTION_AVAILABLE',
  ProductAttributeOptions = 'VALIDATION_PRODUCT_ATTRIBUTE_OPTIONS',
  ProductPublic = 'VALIDATION_PRODUCT_PUBLIC',
  ProhibitedUnless = 'VALIDATION_PROHIBITED_UNLESS',
  ProhibitedWith = 'VALIDATION_PROHIBITED_WITH',
  RequiredConsents = 'VALIDATION_REQUIRED_CONSENTS',
  ShippingMethodPriceRanges = 'VALIDATION_SHIPPING_METHOD_PRICE_RANGES',
  AfterOrEqual = 'VALIDATION_AFTER_OR_EQUAL',
  EnumValue = 'VALIDATION_ENUM_VALUE',
  RequiredWithAll = 'VALIDATION_REQUIRED_WITH_ALL',
  Gte = 'VALIDATION_GTE',
  MediaSlug = 'VALIDATION_MEDIA_SLUG',
  Phone = 'VALIDATION_PHONE',
  AuthProviderActive = 'VALIDATION_AUTH_PROVIDER_ACTIVE',
}

export enum HeseyaClientErrorCode {
  InvalidInstallationResponse = 'CLIENT_INVALID_INSTALLATION_RESPONSE',
  FailedToConnectWithApp = 'CLIENT_FAILED_TO_CONNECT_WITH_APP',
  FailedToUninstallApp = 'CLIENT_FAILED_TO_UNINSTALL_APP',
  AssignInvalidPermissions = 'CLIENT_ASSIGN_INVALID_PERMISSIONS',
  AddAppWithPermissionsUserDontHave = 'CLIENT_ADD_APP_WITH_PERMISSIONS_USER_DONT_HAVE',
  AppRespondedWithInvalidCode = 'CLIENT_APP_RESPONDED_WITH_INVALID_CODE',
  AppRespondedWithInvalidInfo = 'CLIENT_APP_RESPONDED_WITH_INVALID_INFO',
  AppWantsInvalidInfo = 'CLIENT_APP_WANTS_INVALID_INFO',
  AddAppWithoutRequiredPermissions = 'CLIENT_ADD_APP_WITHOUT_REQUIRED_PERMISSIONS',
  AddPermissionnAppDoesntWant = 'CLIENT_ADD_PERMISSION_AP_DOESNT_WANT',
  ModelNotAuditable = 'CLIENT_MODEL_NOT_AUDITABLE',
  InvalidCredentials = 'CLIENT_INVALID_CREDENTIALS',
  InvalidPassword = 'CLIENT_INVALID_PASSWORD',
  InvalidToken = 'CLIENT_INVALID_TOKEN',
  InvalidIdentityToken = 'CLIENT_INVALID_IDENTITY_TOKEN',
  UserDoesntExist = 'CLIENT_USER_DOESNT_EXIST',
  TokenInvalidOrInactive = 'CLIENT_TOKEN_INVALID_OR_INACTIVE',
  DiscountTypeNotSupported = 'CLIENT_DISCOUNT_TYPE_NOT_SUPPORTED',
  CannotApplySelectedDiscountType = 'CLIENT_CANNOT_APPLY_SELECTED_DISCOUNT_TYPE',
  NotEnoughItems = 'CLIENT_NOT_ENOUGH_ITEMS',
  ItemNotFound = 'CLIENT_ITEM_NOT_FOUND',
  WrongValue = 'CLIENT_WRONG_VALUE',
  CreateRoleWithoutPermission = 'CLIENT_CREATE_ROLE_WITHOUT_PERMISSION',
  UpdateRoleWithoutPermission = 'CLIENT_UPDATE_ROLE_WITHOUT_PERMISSION',
  DeleteRoleWithoutPermission = 'CLIENT_DELETE_ROLE_WITHOUT_PERMISSION',
  UpdateOwnerPermission = 'CLIENT_UPDATE_OWNER_PERMISSION',
  DeleteBuildInRole = 'CLIENT_DELETE_BUILT_IN_ROLE',
  GiveRoleThatUserDoesntHave = 'CLIENT_GIVE_ROLE_THAT_USER_DOESNT_HAVE',
  RemoveRoleThatUserDoesntHave = 'CLIENT_REMOVE_ROLE_THAT_USER_DOESNT_HAVE',
  OnlyOwnerGrantsOwnerRole = 'CLIENT_ONLY_OWNER_GRANTS_OWNER_ROLE',
  OnlyOwnerRemovesOwnerRole = 'CLIENT_ONLY_OWNER_REMOVES_OWNER_ROLE',
  OneOwnerRemains = 'CLIENT_ONE_OWNER_REMAINS',
  DeleteWhenRelationExists = 'CLIENT_DELETE_WHEN_RELATION_EXISTS',
  OrderEditError = 'CLIENT_ORDER_EDIT_ERROR',
  ChangeCanceledOrderStatus = 'CLIENT_CHANGE_CANCELED_ORDER_STATUS',
  ModelNotSortable = 'CLIENT_MODEL_NOT_SORTABLE',
  OrderPaid = 'CLIENT_ORDER_PAID',
  UnknownPaymentMethod = 'CLIENT_UNKNOWN_PAYMENT_METHOD',
  InvalidPayment = 'CLIENT_INVALID_PAYMENT',
  GeneratePaymentUrl = 'CLIENT_GENERATE_PAYMENT_URL',
  VerifyPayment = 'CLIENT_VERIFY_PAYMENT',
  UntrustedNotification = 'CLIENT_UNTRUSTED_NOTIFICATION',
  NoRequiredPermissionsToEvent = 'CLIENT_NO_REQUIRED_PERMISSIONS_TO_EVENTS',
  TfaSelectType = 'CLIENT_TFA_SELECT_TYPE',
  TfaCannotRemove = 'CLIENT_TFA_CANNOT_REMOVE',
  TfaRequired = 'CLIENT_TFA_REQUIRED',
  OnlyUserCanSetTfa = 'CLIENT_ONLY_USER_CAN_SET_TFA',
  InvalidTfaType = 'CLIENT_INVALID_TFA_TYPE',
  TfaInvalidToken = 'CLIENT_TFA_INVALID_TOKEN',
  TfaNotSetUp = 'CLIENT_TFA_NOT_SET_UP',
  TfaAlreadySetUp = 'CLIENT_TFA_ALREADY_SET_UP',
  WebhookUserAction = 'CLIENT_WEBHOOK_USER_ACTION',
  WebhookAppAction = 'CLIENT_WEBHOOK_APP_ACTION',
  AppsNoAccess = 'CLIENT_APPS_NO_ACCESS',
  NoAccess = 'CLIENT_NO_ACCESS',
  UnknownStatus = 'CLIENT_UNKNOWN_STATUS',
  RemoveDefaultAddress = 'CLIENT_REMOVE_DEFAULT_ADDRESS',
  StatusUsed = 'CLIENT_STATUS_USED',
  ShippingMethodNotOwner = 'CLIENT_SHIPPING_METHOD_NOT_OWNER',
  ShippingMethodInvalidType = 'CLIENT_SHIPPING_METHOD_INVALID_TYPE',
  ProviderIsNotActive = 'CLIENT_PROVIDER_IS_NOT_ACTIVE',
  ProviderHasNoConfig = 'CLIENT_PROVIDER_HAS_NO_CONFIG',
  ProviderNotFound = 'CLIENT_PROVIDER_NOT_FOUND',
  AlreadyHasAccount = 'CLIENT_ALREADY_HAS_ACCOUNT',
  ProviderMergeTokenExpired = 'CLIENT_PROVIDER_MERGE_TOKEN_EXPIRED',
  CdnNotAllowedToChangeAlt = 'CDN_NOT_ALLOWED_TO_CHANGE_ALT',
  NotEnaughItemsInWarehouse = 'ORDER_NOT_ENOUGH_ITEMS_IN_WAREHOUSE',
  OrderShippingMethodTypeMismatch = 'ORDER_SHIPPING_METHOD_TYPE_MISMATCH',
  ProductSetIsNotOnFavouritesList = 'PRODUCT_SET_IS_NOT_ON_FAVOURITES_LIST',
  ProductPurchaseLimit = 'PRODUCT_PURCHASE_LIMIT',
  PaymentMethodNotAvailableForShipping = 'PAYMENT_METHOD_NOT_AVAILABLE_FOR_SHIPPING',
}

export enum HeseyaServerErrorCode {
  CdnError = 'SERVER_CDN_ERROR',
  TransactionError = 'SERVER_TRANSACTION_ERROR',
}

export type HeseyaErrorCode =
  | HeseyaGeneralErrorCode
  | HeseyaValidationErrorCode
  | HeseyaClientErrorCode
  | HeseyaServerErrorCode
  | 'VALIDATION_ERROR'
