export interface EmailSendDto {
  /**
   * Email title
   */
  title: string
  /**
   * Email address of the receiver
   */
  receiver: string
  /**
   * Email body with html tags
   */
  body: string
}
