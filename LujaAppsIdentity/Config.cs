using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace LujaAppsIdentity
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("messenger-api", "Luja Apps Messenger")
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "messenger-client",
                    ClientName = "Luja Messenger Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AccessTokenType = AccessTokenType.Jwt,
                    RequireClientSecret = false,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris =           { "https://localhost:4200" },
                    PostLogoutRedirectUris = { "https://localhost:4200" },
                    AllowedCorsOrigins =     { "https://localhost:4200" },
                    RequireConsent = false,
                    AllowOfflineAccess = true,

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "messenger-api"
                    }
                }
            };
        }
    }
}
