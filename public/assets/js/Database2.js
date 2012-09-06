var database = {
    betas : {
        'kids_under' : [
            -0.02, -0.051, -0.001, -0.023, 0.004, -0.023,
            -0.043, -0.026, 0.01, -0.051, -0.001, -0.143,
            -0.05, -0.044, 0.018, -0.026, -0.041, -0.022,
            -0.095, -0.087, -0.212, -0.145, -0.196, -0.012,
            -0.187, -0.148, -0.292, 0.253, -0.074, -0.001]
        ,
        'hh_size_rec' : [ 
            -0.014, 0.024, 0.051, 0.05, 0.055,
            0.127, 0.01, 0.041, 0.086, 0.076,
            0.074, 0.122, 0.019, 0.057, 0.077,
            0.115, 0.106, 0.033, 0.049, 0.081,
            0.144, 0.135, 0.176, 0.047, 0.099,
            0.126, 0.145, 0.288, 0.157, 0.047]
        ,
        'female_head' : [ 
            0.193, -0.019, 0.149, 0.069, 0.031,
            -0.029, 0.197, 0.078, 0.293, 0.221,
            0.101, 0.049, 0.049, 0.074, 0.257,
            0.167, 0.096, 0.052, 0.052, 0.085,
            0.206, 0.202, 0.226, 0.192, 0.057,
            0.119, -0.01, 0.054, 0.12, 0.154]
        ,
        'no_spouse' : [ 
            -0.053, 0.211, 0.153, 0.135, 0.2,
            0.13, 0.031, 0.207, 0.207, 0.242,
            0.188, 0.276, 0.111, 0.247, -0.071,
            0.295, 0.252, 0.008, 0.021, 0.155,
            0.429, 0.426, 0.041, -0.201, 0.158,
            0.317, 0.065, 0.313, -0.105, 0.197]
        ,
        'age_head' : [ 
            0.015, 0.012, 0.016, 0.011, 0.017,
            0.02, 0.016, 0.01, 0.014, 0.012,
            0.014, 0.008, 0.016, 0.009, 0.011,
            0.008, 0.014, 0.014, 0.012, 0.008,
            0.009, 0.008, 0.009, 0.016, 0.006,
            0.009, 0.017, 0.006, 0.009, 0.01]
        ,
        'primary1' : [ 
            0.333, 0.385, 0.147, 0.375, 0.342,
            0.283, 0.236, 0.36, 0.243, 0.405,
            0.411, 0.227, 0.291, 0.292, 0.397,
            0.316, 0.491, 0.211, 0.209, 0.135,
            0.154, 0.236, 0.384, 0.286, 0.159,
            0.085, 0.354, 0.562, 0.187, 0.129]
        ,
        'secondary1' : [ 
            0.563, 0.735, 0.451, 0.738, 0.752,
            0.566, 0.433, 0.729, 0.58, 0.837,
            0.769, 0.468, 0.397, 0.631, 0.598,
            0.698, 0.681, 0.363, 0.321, 0.467,
            0.29, 0.428, 0.608, 0.29, 0.205,
            0.371, 0.518, 0.681, 0.492, 0.257]
        ,
        'superior' : [ 
            0.746, 0.939, 0.545, 1.115, 0.895,
            0.464, 0.645, 1.055, 0.434, 0.999,
            0.723, 0.391, 0.595, 0.653, 0.738,
            0.745, 0.682, 0.435, 0.399, 0.492,
            0.22, 0.525, 0.603, 0.469, 0.261,
            0.406, 0.701, 0.601, 0.532, 0.288]
        ,
        'age_spouse' : [ 
            0.01, 0.01, 0.01, 0.016, 0.013,
            0.008, 0.012, 0.013, 0.015, 0.018,
            0.017, 0.007, 0.012, 0.01, 0.016,
            0.018, 0.011, 0.008, 0.012, 0.009,
            0.011, 0.011, 0.003, 0.005, 0.005,
            0.008, -0.007, 0.011, 0.005, 0.008]
        ,
        'primary_s1' : [ 
            0.248, 0.227, 0.325, 0.171, 0.196,
            0.14, 0.212, 0.168, 0.38, 0.318,
            0.163, 0.202, 0.184, 0.178, 0.003,
            0.18, 0.135, 0.137, -0.05, 0.096,
            0.299, 0.252, 0.073, -0.153, 0.079,
            0.324, -0.068, -0.473, -0.146, 0.205]
        ,
        'secondary_s1' : [ 
            0.37, 0.456, 0.358, 0.416, 0.438,
            0.412, 0.394, 0.329, 0.455, 0.475,
            0.463, 0.217, 0.337, 0.342, 0.137,
            0.437, 0.429, 0.247, 0.129, 0.244,
            0.393, 0.628, 0.138, -0.065, 0.136,
            0.429, -0.13, -0.023, -0.153, 0.236]
        ,
        'superior_s' : [ 
            0.701, 0.81, 0.958, 0.35, 0.445,
            0.366, 0.45, 0.46, 0.419, 0.714,
            0.471, 0.488, 0.456, 0.413, 0.314,
            0.576, 0.413, 0.117, 0.231, 0.212,
            0.543, 0.588, 0.164, 0.05, 0.261,
            0.347, 0.084, 0.147, -0.103, 0.261]
        ,
        'dependency' : [ 
            -0.017, -0.04, -0.023, -0.051, -0.07,
            -0.027, -0.003, -0.015, -0.018, -0.034,
            -0.027, -0.013, -0.003, -0.005, -0.011,
            -0.006, -0.025, -0.013, -0.001, -0.008,
            -0.012, -0.026, 0.006, -0.017, -0.011,
            -0.028, -0.028, -0.007, -0.017, -0.016]
        ,
        'informal' : [ 
            -0.134, -0.123, -0.062, -0.15, -0.196,
            -0.074, -0.111, -0.251, -0.231, -0.313,
            -0.184, -0.161, -0.19, -0.226, -0.2,
            -0.4, -0.303, 0.001, -0.147, -0.226,
            -0.172, -0.338, -0.182, -0.153, -0.141,
            -0.078, -0.574, -0.138, -0.193, -0.098]
        ,
        'self_emplo' : [ 
            -0.133, -0.098, -0.069, -0.148, -0.069,
            -0.018, -0.081, -0.102, -0.044, -0.255,
            0.038, -0.12, -0.122, -0.084, -0.145,
            -0.196, -0.023, -0.045, -0.012, -0.036,
            0.026, -0.073, 0.01, -0.004, -0.064,
            0.036, -0.001, 0.155, 0.313, 0.174]
        ,
        'underwork' : [ 
            -0.118, -0.081, -0.088, -0.065, -0.083,
            -0.098, -0.146, -0.082, 0, -0.134,
            -0.112, -0.099, -0.062, -0.077, 0.012,
            0.014, -0.159, -0.04, -0.189, 0.064,
            0.112, 0.395, 0.144, -0.161, 0.076,
            -0.132, 0.195, -0.025, 0.301, -0.23]
        ,
        'professional' : [ 
            0.441, 0.224, 0.392, 0.062, -0.023,
            0.111, 0.181, 0.325, 0.049, 0.139,
            0.207, 0.142, 0.252, 0.142, -0.004,
            0.002, 0.139, 0.41, 0.312, 0.077,
            0.217, -0.301, 0.058, 0.234, 0.141,
            0.089, 0.157, -0.121, 0.133, 0.086]
        ,
        'technical' : [ 
            0.258, 0.28, 0.054, 0.285, 0.238,
            0.084, 0.115, 0.13, 0.012, 0.161,
            0.068, 0.091, 0.079, 0.114, -0.065,
            0.078, -0.069, -0.098, 0.165, -0.004,
            0.041, -0.176, -0.011, 0.04, -0.053,
            -0.042, 0.03, -0.186, -0.057, -0.192]
        ,
        'operative' : [ 
            0.152, 0.092, 0.042, 0.108, 0.106,
            0.01, 0.085, 0.124, -0.023, 0.102,
            0.008, 0.06, 0.041, 0.031, -0.059,
            -0.018, -0.047, 0.024, 0.102, -0.073,
            0.167, -0.141, -0.088, 0.04, -0.077,
            -0.055, 0.208, -0.18, -0.049, -0.196]
        ,
        'migrant_int' : [ 
            -0.05, 0.165, 0.427, 0.996, 0.825,
            3.913, 0.033, 0.322, 0.471, 4.37,
            0.732, 0.492, 0.162, 0.331, 0.836,
            0.641, 0.705, 0.762, 0.301, 0.084,
            3.895, 0.071, 0.734, 0.599, 0.191,
            0.44, 0.566, 3.707, -0.301, -0.049]
        ,
        'migrant_li' : [ 
            0.017, -0.342, -0.707, -1.008, -0.74,
            -3.978, -0.105, -0.521, -0.723, -4.514,
            -0.788, -0.539, -0.377, -0.556, -1.108,
            -0.843, -0.778, -0.873, -0.527, -0.194,
            -4.149, -0.121, -0.97, -0.776, -0.118,
            -0.577, 0, -3.74, 0.395, -0.037]
        ,
        'migrant_pcia' : [ 
            -0.189, -0.048, -0.09, 0.118, 0.047,
            0.023, -0.166, -0.003, -0.073, 0.196,
            0.045, 0.135, -0.101, -0.03, -0.015,
            0.089, 0.09, 0.051, -0.163, 0.032,
            -0.018, 0.14, 0.015, 0.208, 0.042,
            0.145, 0.34, -0.09, -0.093, 0.087]
        ,
        'date_1' : [ 
            -0.271, -0.013, 0.011, -0.242, -0.291,
            0.143, -0.124, -0.116, -0.379, -0.444,
            0.089, 0.095, 0.001, 0.069, 0.096,
            -0.062, -0.472, -0.472, 0.129, 0.245,
            -0.073, -0.642, -0.128, -0.123, 0.38,
            0.071, 0.174, 0.092, 0.121, 0.043]
        ,
        'date_2' : [ 
            -0.237, 0.011, 0.133, -0.175, -0.222,
            -0.096, 0.038, -0.135, -0.41, -0.334,
            -0.072, -0.002, 0.043, 0.025, 0.186,
            -0.273, -0.359, -0.164, 0.025, -0.032,
            -0.136, -0.769, -0.027, -0.181, 0.383,
            0.236, 0.375, 0.121, 0.149, 0.082]
        ,
        'date_3' : [ 
            -0.043, -0.119, -0.217, -0.228, -0.193,
            -0.016, -0.28, -0.1, -0.127, -0.224,
            -0.047, -0.238, -0.17, -0.032, -0.08,
            -0.276, -0.321, -0.114, 0.159, 0.002,
            -0.397, -0.742, 0.009, -0.131, 0.335,
            0.135, 0.012, -0.163, 0.166, 0.054]
        ,
        'date_4' : [ 
            -0.104, -0.051, -0.16, -0.115, -0.211,
            0.416, -0.241, -0.045, -0.097, -0.343,
            0.172, -0.131, 0.043, -0.022, -0.183,
            -0.343, -0.35, -0.443, 0.175, -0.022,
            -0.226, -0.884, -0.041, 0.02, 0.259,
            0.001, 0.057, 0.086, 0.347, 0.066]
        ,
        'date_5' : [ 
            -0.216, 0.042, 0.019, -0.147, -0.156,
            0.229, -0.1, -0.019, -0.369, -0.239,
            -0.003, -0.103, 0.077, 0.13, -0.102,
            -0.226, -0.253, -0.329, 0.038, 0.051,
            -0.284, -0.636, -0.175, -0.317, 0.234,
            0.041, 0.076, 0.1, 0.065, 0.215]
        ,
        'date_6' : [ 
            -0.092, -0.012, -0.127, -0.129, -0.215,
            -0.047, -0.109, 0.093, -0.38, -0.266,
            -0.102, -0.166, 0.006, 0.103, 0.047,
            -0.208, -0.271, -0.233, 0.039, -0.037,
            -0.129, -0.532, -0.062, -0.049, 0.327,
            0.298, 0.337, -0.074, 0.186, 0.249]
        ,
        'date_7' : [ 
            -0.097, -0.022, -0.136, -0.161, -0.206,
            0.483, -0.108, -0.046, -0.466, -0.222,
            -0.049, -0.083, -0.036, 0.043, 0.031,
            -0.196, -0.191, -0.019, 0.182, -0.12,
            -0.302, -0.679, 0.107, 0.089, 0.422,
            -0.006, 0.016, 0.103, 0.305, 0.294]
        ,
        'date_8' : [ 
            -0.181, -0.112, -0.05, -0.149, -0.096,
            0.369, -0.1, -0.044, -0.438, -0.284,
            0.043, -0.068, 0.047, 0.072, -0.116,
            -0.291, -0.114, -0.135, 0.094, -0.088,
            -0.406, -0.696, 0.081, -0.224, 0.286,
            -0.112, -0.045, 0.273, 0.311, 0.305]
        ,
        'date_9' : [ 
            -0.254, 0.087, -0.104, -0.108, -0.1,
            0.152, -0.174, -0.063, -0.437, -0.25,
            -0.055, -0.178, 0.047, 0.106, -0.023,
            -0.13, -0.312, -0.302, 0.194, 0.039,
            -0.449, -0.498, 0.106, 0.027, 0.143,
            -0.002, -0.105, 0.308, 0.212, 0.1]
        ,
        'date_10' : [ 
            -0.144, 0.049, -0.228, -0.082, -0.118,
            0.301, -0.154, 0.048, -0.451, -0.282,
            -0.11, -0.082, -0.067, 0.106, 0.174,
            -0.067, -0.265, -0.348, 0.004, -0.004,
            -0.266, -0.647, -0.08, 0.058, 0.283,
            0.099, 0.126, 0.335, 0.348, 0.027]
        ,
        'date_11' : [ 
            -0.091, -0.017, -0.043, -0.092, -0.08,
            0.562, -0.113, -0.002, -0.323, -0.343,
            -0.044, 0.211, -0.119, 0.07, 0.019,
            -0.186, -0.212, -0.215, 0.059, 0.041,
            -0.27, -0.431, 0.069, -0.148, 0.208,
            0.083, 0.143, -0.182, 0.158, 0.139]
        ,
        'date_12' : [ 
            -0.25, -0.074, -0.087, -0.126, -0.134,
            0.422, 0.034, -0.005, -0.305, -0.339,
            0.099, 0.066, -0.049, -0.025, -0.08,
            -0.06, -0.355, -0.268, 0.086, -0.099,
            -0.382, -0.392, 0.178, -0.147, 0.226,
            0.082, -0.1, 0.187, 0.145, 0.369]
        ,
        'date_13' : [ 
            -0.282, -0.065, -0.129, -0.095, -0.115,
            -0.131, -0.097, 0.031, -0.328, -0.113,
            -0.04, -0.035, 0.085, 0.12, -0.09,
            -0.232, -0.262, -0.163, 0.07, -0.068,
            -0.492, -0.163, 0.112, -0.042, 0.33,
            -0.004, -0.241, 0.219, 0.284, 0.178]
        ,
        'date_14' : [ 
            -0.206, 0.032, -0.281, -0.079, -0.125,
            -0.137, -0.149, -0.076, -0.352, -0.193,
            -0.036, 0.057, -0.004, 0.141, -0.001,
            0.003, -0.173, -0.331, 0.008, 0.037,
            -0.392, -0.359, 0.013, -0.037, 0.328,
            0.05, -0.131, 0.17, 0.345, 0.047]
        ,
        'date_15' : [ 
            -0.191, 0.109, -0.182, -0.095, -0.138,
            -0.005, -0.151, 0.074, -0.321, -0.112,
            0.128, -0.196, -0.076, 0.077, -0.136,
            -0.071, -0.109, -0.426, 0.032, -0.068,
            -0.181, -0.394, 0.116, -0.099, 0.146,
            0.18, 0.216, 0.254, 0.061, 0.08]
        ,
        'date_16' : [ 
            -0.06, 0.062, -0.02, -0.109, -0.092,
            -0.042, -0.068, 0.087, -0.275, -0.113,
            0.067, -0.045, -0.025, 0.175, -0.011,
            -0.156, -0.13, -0.363, 0.12, 0.09,
            -0.497, -0.446, 0.103, -0.077, 0.212,
            0.12, 0.132, 0.647, 0.019, 0.075]
        ,
        'date_17' : [ 
            -0.288, 0.028, -0.246, 0.044, -0.086,
            -0.086, -0.145, -0.03, -0.236, -0.111,
            0.124, -0.055, 0.09, 0.013, -0.022,
            -0.091, -0.299, -0.274, -0.054, 0.085,
            -0.077, -0.552, 0.069, -0.24, 0.052,
            0.058, 0.082, 0.055, 0.071, 0.208]
        ,
        'date_18' : [ 
            -0.122, 0.066, -0.161, 0.027, -0.043,
            -0.16, -0.065, 0.044, -0.167, -0.124,
            -0.031, -0.061, 0.001, 0.06, 0.061,
            -0.187, -0.126, -0.33, -0.024, 0.08,
            0.282, -0.353, 0.093, -0.2, -0.056,
            0.06, -0.217, 0.366, 0.049, 0.122]
        ,
        'date_19' : [ 
            -0.059, 0.058, 0.132, 0.054, -0.05,
            0.057, 0.013, 0.066, -0.238, -0.231,
            0.049, -0.096, 0.073, 0.094, 0.141,
            -0.208, -0.221, -0.404, 0.029, 0.08,
            -0.205, -0.344, 0.145, -0.193, 0.219,
            0.124, 0.079, 0.312, -0.038, 0.066]
        ,
        'date_20' : [ 
            -0.113, -0.002, 0.102, 0.18, -0.126,
            0.171, 0.07, 0.114, -0.094, -0.079,
            0.019, 0.043, -0.149, 0.169, 0.212,
            -0.128, -0.194, -0.369, 0.098, -0.015,
            0.103, -0.464, 0.095, -0.234, 0.309,
            0.01, 0.35, -0.071, 0.011, 0.078]
        ,
        'date_21' : [ 
            -0.208, 0.111, 0.125, 0.211, -0.072,
            0.019, -0.175, 0.057, -0.208, 0.018,
            0.066, 0.022, -0.032, 0.063, 0.429,
            0.26, -0.258, -0.169, -0.036, -0.017,
            -0.173, -0.581, 0.063, -0.16, 0.151,
            0.099, 0.246, 0.005, 0.123, 0.158]
        ,
        'date_22' : [ 
            -0.313, 0.07, 0.152, 0.119, -0.057,
            0.053, -0.058, -0.015, -0.195, -0.018,
            0.036, -0.092, 0.003, 0.14, 0.244,
            0.044, -0.314, -0.413, -0.048, 0.052,
            -0.343, -0.245, 0.138, -0.166, 0.161,
            0.058, 0.07, -0.06, 0.109, -0.01]
        ,
        'date_23' : [ 
            -0.105, 0.009, 0.044, 0.088, -0.117,
            -0.059, -0.01, 0.006, -0.156, 0.079,
            0.038, -0.131, 0.069, 0.148, 0.249,
            -0.232, -0.139, -0.361, 0.064, 0.065,
            -0.199, -0.559, -0.013, -0.159, 0.179,
            0.107, 0.432, 0.217, 0.046, -0.039]
        ,
        'date_24' : [ 
            -0.018, 0.063, 0.065, 0.129, -0.126,
            -0.018, -0.038, -0.023, 0.039, 0.029,
            0.007, 0.028, 0.042, 0.068, 0.203,
            -0.117, -0.161, -0.257, 0.1, -0.041,
            0.027, -0.308, 0.049, -0.155, 0.205,
            0.26, -0.131, 0.107, 0.249, 0.065]
        ,
        'date_25' : [ 
            -0.209, 0.094, 0.158, 0.15, -0.1,
            0.164, -0.12, 0.032, -0.234, 0.116,
            0.092, -0.009, -0.045, 0.056, 0.303,
            0.066, -0.192, -0.248, 0.019, -0.074,
            -0.013, -0.237, 0.073, -0.234, 0.079,
            0.02, 0.134, 0.069, 0.152, -0.005]
        ,
        'date_26' : [ 
            -0.352, 0.068, 0.069, 0.118, -0.029,
            0.029, -0.186, 0.057, -0.129, -0.021,
            -0.048, -0.038, -0.031, 0.072, 0.555,
            0.154, -0.27, -0.348, 0.015, 0.043,
            -0.117, -0.362, -0.188, -0.243, 0.036,
            0.095, 0.198, 0.134, 0.196, -0.065]
        ,
        'date_27' : [ 
            0.111, 0.056, 0.097, 0.106, -0.077,
            0.025, -0.106, 0.025, -0.135, 0.047,
            -0.03, -0.001, -0.138, -0.001, 0.401,
            -0.067, -0.342, -0.385, 0.177, -0.051,
            -0.305, -0.258, -0.09, -0.071, 0.09,
            0.18, 0.042, -0.13, 0.022, -0.038]
        ,
        'date_28' : [ 
            -0.108, 0.017, 0.034, 0.116, -0.207,
            -0.045, -0.03, -0.084, 0.024, -0.054,
            0.018, -0.079, -0.122, 0.093, 0.136,
            -0.019, -0.207, -0.136, 0.137, -0.02,
            -0.227, -0.246, 0.094, 0.027, 0.073,
            0.148, -0.136, 0.109, -0.019, 0.062]
        ,
        'date_29' : [ 
            -0.193, -0.031, 0.043, 0.105, -0.05,
            -0.068, -0.141, 0.035, -0.141, -0.068,
            -0.05, 0.019, -0.211, -0.008, 0.116,
            0.264, -0.221, -0.404, 0.084, 0.003,
            -0.247, -0.472, 0.08, 0.083, 0.078,
            0.065, -0.075, -0.009, -0.073, 0.031]
        ,
        'date_30' : [ 
            -0.187, 0.071, -0.03, 0.084, 0.021,
            0.103, -0.009, -0.004, -0.107, 0.017,
            0.053, 0.04, -0.136, -0.032, 0.001,
            0.045, -0.22, -0.332, 0.012, -0.016,
            -0.175, -0.57, 0.093, -0.157, 0.05,
            0.007, 0.064, 0.198, 0.082, 0.138
        ]
    },
    means : {
        'date_1' : [ 
            0.0162, 0.0198, 0.0206, 0.0192, 0.0186,
            0.0118, 0.0179, 0.0201, 0.0197, 0.0151,
            0.0202, 0.0135, 0.0193, 0.0185, 0.0202,
            0.02, 0.0203, 0.012, 0.0212, 0.0186,
            0.022, 0.0158, 0.0206, 0.0125, 0.0245,
            0.0194, 0.0221, 0.0184, 0.0207, 0.00973]
        ,
        'date_2' : [ 
            0.0274, 0.0278, 0.0278, 0.0229, 0.0256,
            0.0163, 0.0287, 0.0256, 0.0276, 0.0226,
            0.0274, 0.0165, 0.0271, 0.0255, 0.0278,
            0.0272, 0.0264, 0.0184, 0.0309, 0.0261,
            0.0283, 0.0242, 0.0269, 0.0149, 0.0324,
            0.0286, 0.0302, 0.0256, 0.0278, 0.0121]
        ,
        'date_3' : [ 
            0.0275, 0.0267, 0.0245, 0.0231, 0.0249,
            0.0169, 0.0267, 0.0262, 0.0238, 0.0231,
            0.025, 0.0196, 0.0234, 0.0267, 0.0267,
            0.0266, 0.0255, 0.0161, 0.0261, 0.0267,
            0.0286, 0.0256, 0.0252, 0.0149, 0.027,
            0.0284, 0.0344, 0.0254, 0.0283, 0.013]
        ,
        'date_4' : [ 
            0.0303, 0.0286, 0.0248, 0.0238, 0.026,
            0.0177, 0.0282, 0.0287, 0.0263, 0.0257,
            0.0257, 0.0142, 0.031, 0.0259, 0.0266,
            0.0291, 0.0261, 0.0155, 0.0306, 0.0274,
            0.0259, 0.0275, 0.0263, 0.0164, 0.0329,
            0.0285, 0.0293, 0.023, 0.0254, 0.0164]
        ,
        'date_5' : [ 
            0.0357, 0.0282, 0.0273, 0.0264, 0.0271,
            0.0128, 0.0311, 0.0289, 0.0266, 0.0288,
            0.0261, 0.0172, 0.0343, 0.0272, 0.0293,
            0.026, 0.0262, 0.0179, 0.0335, 0.0277,
            0.0271, 0.0265, 0.0284, 0.018, 0.0362,
            0.028, 0.0292, 0.0267, 0.0314, 0.0157]
        ,
        'date_6' : [ 
            0.0309, 0.0273, 0.0279, 0.0274, 0.0273,
            0.0173, 0.0328, 0.0282, 0.028, 0.0265,
            0.0271, 0.013, 0.0307, 0.0286, 0.0287,
            0.0261, 0.0258, 0.0183, 0.0338, 0.0279,
            0.0276, 0.0262, 0.0269, 0.0171, 0.0337,
            0.029, 0.0334, 0.0285, 0.0294, 0.0152]
        ,
        'date_7' : [ 
            0.0361, 0.0282, 0.026, 0.0276, 0.0252,
            0.0173, 0.0337, 0.0289, 0.0266, 0.0257,
            0.0262, 0.0156, 0.0337, 0.0279, 0.0301,
            0.0272, 0.0251, 0.0155, 0.0338, 0.0284,
            0.0279, 0.0262, 0.0276, 0.017, 0.0355,
            0.0279, 0.03, 0.0276, 0.0297, 0.0158]
        ,
        'date_8' : [ 
            0.0352, 0.0272, 0.0265, 0.0259, 0.0271,
            0.0165, 0.0343, 0.0274, 0.0267, 0.028,
            0.0259, 0.0162, 0.0344, 0.0273, 0.0293,
            0.0261, 0.0268, 0.0158, 0.0341, 0.0272,
            0.0284, 0.0269, 0.0248, 0.0174, 0.033,
            0.028, 0.0312, 0.0276, 0.0303, 0.0175]
        ,
        'date_9' : [
            0.0341, 0.0294, 0.0301, 0.0264, 0.0275,
            0.0146, 0.0353, 0.0278, 0.0273, 0.0281,
            0.028, 0.0168, 0.037, 0.0275, 0.029,
            0.0267, 0.0268, 0.0176, 0.0335, 0.0301,
            0.0304, 0.0259, 0.0268, 0.0164, 0.0384,
            0.0294, 0.027, 0.0237, 0.0281, 0.0173]
        ,
        'date_10' : [ 
            0.0362, 0.0287, 0.0273, 0.0275, 0.0277,
            0.0134, 0.0375, 0.0267, 0.0289, 0.0274,
            0.0281, 0.0153, 0.0361, 0.0279, 0.0262,
            0.0278, 0.0282, 0.0171, 0.0345, 0.0293,
            0.029, 0.0286, 0.0258, 0.0172, 0.0367,
            0.0305, 0.033, 0.023, 0.0244, 0.0174]
        ,
        'date_11' : [ 
            0.0381, 0.027, 0.0258, 0.0278, 0.0267,
            0.0126, 0.0348, 0.0266, 0.028, 0.0273,
            0.0274, 0.0162, 0.0351, 0.0276, 0.0276,
            0.0261, 0.0263, 0.0159, 0.035, 0.0272,
            0.0295, 0.0288, 0.0297, 0.0144, 0.0369,
            0.0274, 0.0313, 0.0272, 0.0268, 0.0167]
        ,
        'date_12' : [ 
            0.0386, 0.0279, 0.0279, 0.0284, 0.0285,
            0.0122, 0.0349, 0.0287, 0.03, 0.0289,
            0.0272, 0.0162, 0.0383, 0.0283, 0.0308,
            0.0281, 0.0267, 0.0137, 0.0373, 0.0297,
            0.0281, 0.0248, 0.0265, 0.0176, 0.0361,
            0.03, 0.0285, 0.03, 0.0313, 0.0172]
        ,
        'date_13' : [ 
            0.0385, 0.0359, 0.0369, 0.0363, 0.0343,
            0.0285, 0.0372, 0.0371, 0.0341, 0.0361,
            0.0344, 0.0301, 0.0366, 0.0361, 0.0365,
            0.0329, 0.0361, 0.0326, 0.037, 0.0365,
            0.0324, 0.036, 0.0361, 0.0322, 0.0362,
            0.0355, 0.0339, 0.0359, 0.038, 0.0344]
        ,
        'date_14' : [ 
            0.0356, 0.0364, 0.0364, 0.0391, 0.0394,
            0.0392, 0.0383, 0.0371, 0.0376, 0.0369,
            0.0371, 0.0414, 0.0315, 0.0396, 0.0349,
            0.037, 0.0412, 0.0394, 0.0327, 0.0414,
            0.0352, 0.038, 0.036, 0.0377, 0.0365,
            0.0373, 0.035, 0.0375, 0.0365, 0.0412]
        ,
        'date_15' : [ 
            0.0359, 0.0361, 0.0349, 0.0397, 0.038,
            0.0405, 0.0369, 0.0373, 0.0326, 0.0371,
            0.0392, 0.0415, 0.0334, 0.0384, 0.035,
            0.0408, 0.0347, 0.044, 0.0351, 0.0378,
            0.0351, 0.0345, 0.0404, 0.0396, 0.0346,
            0.036, 0.039, 0.034, 0.0386, 0.0422]
        ,
        'date_16' : [ 
            0.0294, 0.0373, 0.0336, 0.0378, 0.037,
            0.0401, 0.0327, 0.0357, 0.034, 0.038,
            0.0372, 0.0418, 0.031, 0.0374, 0.0366,
            0.0375, 0.036, 0.0423, 0.0329, 0.0355,
            0.0339, 0.0362, 0.0372, 0.041, 0.0342,
            0.0354, 0.0355, 0.0337, 0.0332, 0.0417]
        ,
        'date_17' : [ 
            0.0347, 0.0315, 0.0316, 0.0379, 0.0384,
            0.0392, 0.0302, 0.0354, 0.0339, 0.0343,
            0.0363, 0.0458, 0.0295, 0.0351, 0.0385,
            0.0368, 0.0366, 0.0396, 0.0312, 0.0358,
            0.0351, 0.032, 0.0348, 0.0424, 0.0294,
            0.0329, 0.034, 0.0373, 0.0354, 0.045]
        ,
        'date_18' : [ 
            0.0373, 0.0349, 0.0364, 0.0361, 0.0387,
            0.0453, 0.0344, 0.0373, 0.0344, 0.0371,
            0.0378, 0.044, 0.0354, 0.0376, 0.0373,
            0.0376, 0.0352, 0.0415, 0.035, 0.0353,
            0.0384, 0.0342, 0.0373, 0.0463, 0.0282,
            0.0371, 0.0365, 0.0478, 0.0379, 0.0438]
        ,
        'date_19' : [ 
            0.0341, 0.0361, 0.0353, 0.0377, 0.0388,
            0.0449, 0.033, 0.038, 0.0383, 0.0379,
            0.0356, 0.0462, 0.0342, 0.0371, 0.0384,
            0.035, 0.0384, 0.0411, 0.0341, 0.0374,
            0.0375, 0.0359, 0.0359, 0.0434, 0.0327,
            0.0357, 0.0355, 0.0414, 0.0388, 0.0433]
        ,
        'date_20' : [ 
            0.0348, 0.0364, 0.0345, 0.0376, 0.0378,
            0.0514, 0.0343, 0.0375, 0.0384, 0.0385,
            0.0364, 0.0431, 0.0328, 0.0368, 0.0361,
            0.0407, 0.0371, 0.0467, 0.0342, 0.0373,
            0.0406, 0.0352, 0.0397, 0.0422, 0.0313,
            0.0361, 0.0325, 0.0353, 0.0368, 0.0465]
        ,
        'date_21' : [ 
            0.0333, 0.0355, 0.0368, 0.0381, 0.0394,
            0.0419, 0.0354, 0.0365, 0.0355, 0.0369,
            0.0371, 0.0475, 0.0337, 0.0368, 0.0379,
            0.0385, 0.0374, 0.0433, 0.0326, 0.0375,
            0.0347, 0.0363, 0.0354, 0.0472, 0.0319,
            0.0368, 0.0337, 0.0331, 0.0334, 0.0476]
        ,
        'date_22' : [ 
            0.034, 0.0353, 0.0365, 0.0363, 0.0376,
            0.0415, 0.0331, 0.0349, 0.0378, 0.0397,
            0.0355, 0.0444, 0.0343, 0.0355, 0.0321,
            0.0368, 0.0376, 0.0454, 0.0327, 0.0358,
            0.0377, 0.0394, 0.0361, 0.0412, 0.033,
            0.0351, 0.0344, 0.0375, 0.0341, 0.0437]
        ,
        'date_23' : [ 
            0.0323, 0.0367, 0.0363, 0.035, 0.0368,
            0.0512, 0.0359, 0.0343, 0.0387, 0.0368,
            0.0373, 0.0461, 0.0348, 0.0358, 0.0346,
            0.0384, 0.0361, 0.0417, 0.0322, 0.0349,
            0.035, 0.0403, 0.0352, 0.0478, 0.0334,
            0.0344, 0.0344, 0.0362, 0.037, 0.044]
        ,
        'date_24' : [ 
            0.0313, 0.0387, 0.0384, 0.0378, 0.0357,
            0.0447, 0.0349, 0.037, 0.0366, 0.0351,
            0.0384, 0.0434, 0.0332, 0.0365, 0.0359,
            0.0365, 0.0369, 0.0489, 0.0331, 0.0352,
            0.0371, 0.0406, 0.0357, 0.048, 0.0315,
            0.0367, 0.037, 0.034, 0.0359, 0.0448]
        ,
        'date_25' : [ 
            0.0309, 0.036, 0.0398, 0.0376, 0.0361,
            0.0445, 0.0314, 0.0366, 0.0383, 0.0366,
            0.0371, 0.0424, 0.0327, 0.0363, 0.0359,
            0.0337, 0.0388, 0.0445, 0.0309, 0.0366,
            0.0323, 0.0387, 0.0357, 0.0474, 0.031,
            0.0364, 0.0308, 0.0368, 0.0346, 0.045]
        ,
        'date_26' : [ 
            0.0288, 0.0356, 0.0377, 0.0358, 0.0357,
            0.0488, 0.0306, 0.0355, 0.0364, 0.0366,
            0.0361, 0.0441, 0.0335, 0.0352, 0.0343,
            0.0361, 0.0353, 0.0444, 0.0302, 0.0347,
            0.036, 0.0413, 0.0365, 0.0434, 0.0302,
            0.0349, 0.0365, 0.0346, 0.0346, 0.0435]
        ,
        'date_27' : [ 
            0.0312, 0.0365, 0.035, 0.0379, 0.0363,
            0.0461, 0.0324, 0.0366, 0.0399, 0.0367,
            0.0337, 0.046, 0.0328, 0.0365, 0.034,
            0.0345, 0.0357, 0.0489, 0.0323, 0.035,
            0.0365, 0.039, 0.0382, 0.0442, 0.0291,
            0.0369, 0.0334, 0.0379, 0.0343, 0.0445]
        ,
        'date_28' : [ 
            0.0322, 0.0378, 0.0377, 0.0373, 0.0338,
            0.0478, 0.0308, 0.0348, 0.037, 0.0384,
            0.0385, 0.0451, 0.0352, 0.0369, 0.0324,
            0.0343, 0.0357, 0.0444, 0.0309, 0.0356,
            0.0387, 0.0362, 0.0369, 0.045, 0.0311,
            0.034, 0.0327, 0.0388, 0.0356, 0.047]
        ,
        'date_29' : [ 
            0.0268, 0.0359, 0.0401, 0.0354, 0.0344,
            0.0451, 0.0298, 0.0346, 0.0355, 0.0372,
            0.0363, 0.0421, 0.0323, 0.0351, 0.0365,
            0.034, 0.0378, 0.04, 0.0323, 0.0331,
            0.0321, 0.0342, 0.0356, 0.0462, 0.031,
            0.0336, 0.0312, 0.0353, 0.0316, 0.0455]
        ,
        'date_30' : [ 
            0.0291, 0.034, 0.0372, 0.035, 0.0343,
            0.0472, 0.0318, 0.0341, 0.0344, 0.0365,
            0.0353, 0.0431, 0.03, 0.0329, 0.0336,
            0.0359, 0.0357, 0.047, 0.0317, 0.0344,
            0.0352, 0.0343, 0.0353, 0.0388, 0.0294,
            0.0339, 0.0325, 0.0362, 0.0358, 0.0412]
    },
    cons : [
        -0.722, -0.734, -0.888, -1.244, -1.667,
        -1.212, -0.745, -0.641, -0.84, -1.304,
        -1.647, -0.417, -0.661, -0.227, -0.598,
        -0.973, -0.959, 0.192, -0.234, 0.399,
        -0.143, 0.171, -0.351, 0.243, 0.293,
        0.319, 0.522, -0.177, 0.144, 0.417
    ]
}

function getBetas() {
    return database.betas;
}

function getMeans() {
    return database.means;
}

function getCons() {
    return database.cons;
}

function getModels() {
    return 30;
}