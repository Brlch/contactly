using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace contactly.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private IMemoryCache _cache;
        private readonly ILogger<ContactController> _logger;
        private const String contactCache = "contactCache";
        public ContactController(ILogger<ContactController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _cache = memoryCache;
        }
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            List<Contact> contacts = new List<Contact>();
            contacts.Add(new Contact { Name = "Test", Phone = "12312312", Email = "test@test.com" });
            if (_cache.TryGetValue(contactCache, out contacts))
            {
                return contacts.ToArray();
            }
            else
            {
                contacts = new List<Contact>();
                contacts.Add(new Contact { Name = "Test", Phone = "12312312", Email = "test@test.com" });
                return contacts.ToArray();
            }
        }
        [HttpPost]
        public ActionResult Post(Contact contact)
        {
            List<Contact> contacts = new List<Contact>();
            _cache.TryGetValue(contactCache, out contacts);
            var existingContact = contacts.FirstOrDefault(X => X.Name == contact.Name);
            if (existingContact != null)
            {
                contacts.Add(contact);
                _cache.Set(contactCache, contacts);
                return Content("Contact added correctly.");
            }
            return Content("Contact already exists.");

        }
    }
}
