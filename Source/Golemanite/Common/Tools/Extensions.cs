﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

namespace Golemanite
{
    public static class Extensions
    {
        public static bool IsEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }

        public static string ToEmptyIfNull(this string str)
        {
            if (str == null)
            {
                str = string.Empty;
            }

            return str;
        }

        public static string ToEmptyStringIfNull(this object obj)
        {
            if (obj == null)
            {
                return string.Empty;
            }

            var objStr = obj.ToString();
            if (objStr.IsEmpty() == true)
            {
                return string.Empty;
            }

            return objStr;
        }
    }
}