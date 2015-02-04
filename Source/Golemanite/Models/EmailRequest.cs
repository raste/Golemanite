﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System.ComponentModel.DataAnnotations;

namespace Golemanite.Models
{
    public class EmailRequest
    {
        [Required(AllowEmptyStrings = false)]
        public string ContactName { get; set; }

        [Required(AllowEmptyStrings = false)]
        //Same as JQuery Validation plugin email regex!
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]
        public string ContactEmail { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string ContactMessage { get; set; }
    }
}