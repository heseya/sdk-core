import { EmailSendDto } from '../../../interfaces'
import { ServiceFactory } from '../types/Service'

export interface EmailService {
  send(email?: EmailSendDto): Promise<true>
}

export const createEmailsService: ServiceFactory<EmailService> = (axios) => ({
  async send(emailData) {
    await axios.post(`/email`, emailData)
    return true
  },
})
