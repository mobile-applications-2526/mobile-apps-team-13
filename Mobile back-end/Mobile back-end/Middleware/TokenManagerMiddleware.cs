using System.Net;
using Mobile_back_end.Services;

namespace Mobile_back_end.Middleware;

public class TokenManagerMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context, TokenManager tokenManager)
    {
        var token = context.Request.Headers.Authorization;
        if (!String.IsNullOrEmpty(token))
        {
            // check if path is not login or register
            if (context.Request.Path != "/api/login" && context.Request.Path != "/api/register")
            {
                if (tokenManager.IsTokenRevoked(token.ToString()) == false)
                {
                    await next(context);
                    return;
                }
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }
        }
        await next(context);
    }
}

public static class TokenManagerMiddlewareExtensions
{
    public static IApplicationBuilder UseTokenManagerMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<TokenManagerMiddleware>();
    }
}