
export function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {

    if (!request.session.username) {
      return Promise.reject({});
    }

    return Promise.resolve({
      username: request.session.username,
      userId: request.session.userId
    });
}