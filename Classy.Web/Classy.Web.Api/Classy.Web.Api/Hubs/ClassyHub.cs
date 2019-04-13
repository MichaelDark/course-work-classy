using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Drawing;
using System.Net;
using System.Net.Http;

namespace Classy.Web.Api.Hubs
{
    public class ClassyHub : Hub
    {
        public static Dictionary<ClaimsPrincipal, List<string>> Storage = new Dictionary<ClaimsPrincipal, List<string>>();
        public static string BaseURL { get; set; } = @"https://classy-classifier.herokuapp.com/classifier";
        public async Task SendTest(string base64String, string format)
        {
            int startIndex = 13 + format.Length;
            base64String = base64String.Substring(startIndex, base64String.Length - startIndex);
            if (Storage.ContainsKey(this.Context.User))
            {
                Storage[this.Context.User].Add(base64String);
            }
            else
            {
                Storage.Add(this.Context.User, new List<string>() { base64String });
            }
            byte[] bytes = new byte[1];
            try
            {
                bytes = Convert.FromBase64String(base64String);
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("response", e.Message);
            }
            using (var stream = new MemoryStream(bytes, 0, bytes.Length))
            {
                var URL = BaseURL + @"/classify_single";
                var response = await SendToServer(URL, stream);
                await Clients.Caller.SendAsync("response", response);
            }
        }

        public async Task<string> SendToServer(string URL, Stream imageStream)
        {
            HttpContent streamParameter = new StreamContent(imageStream);
            using (var client = new HttpClient())
            {
                using (var formData = new MultipartFormDataContent())
                {
                    formData.Add(streamParameter, "image", "image");
                    var response = await client.PostAsync(URL, formData);
                    return await response.Content.ReadAsStringAsync();
                }

            }
        }



    }
}
