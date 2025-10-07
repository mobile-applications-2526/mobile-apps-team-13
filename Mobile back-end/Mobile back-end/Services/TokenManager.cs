namespace Mobile_back_end.Services;

public class TokenManager
{
    private readonly List<string> _revokedTokens = [];

    public virtual void AddToRevokedTokens(string token)
    {
        if (!_revokedTokens.Contains(token))
        {
            _revokedTokens.Add(token);
        }
    }

    public virtual bool IsTokenRevoked(string token)
    {
        RemoveExpiredTokens();
        return _revokedTokens.Contains(token);
    }

    private void RemoveExpiredTokens()
    {
        _revokedTokens.RemoveAll(token => (Utils.AuthUtils.CheckTokenIsValid(token) == false));
    }
}