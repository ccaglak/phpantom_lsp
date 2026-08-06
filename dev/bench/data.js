window.BENCHMARK_DATA = {
  "lastUpdate": 1785984545544,
  "repoUrl": "https://github.com/ccaglak/phpantom_lsp",
  "entries": {
    "PHPantom Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "41be3555d129d62ed88b6f2c4315a76918bf094b",
          "message": "Container string aliases",
          "timestamp": "2026-07-13T04:00:13+02:00",
          "tree_id": "65b9e8c7d0e4f8570c1504efd61ef8fa0d4bc76d",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/41be3555d129d62ed88b6f2c4315a76918bf094b"
        },
        "date": 1783916995175,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.286,
            "range": "± 0.101",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.03,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.081,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.118,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.204,
            "range": "± 0.012",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.198,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.796,
            "range": "± 0.029",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.536,
            "range": "± 0.010",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.076,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.033,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.044,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 3.419,
            "range": "± 0.064",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.202,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.194,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.049,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.091,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.064,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.053,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.141,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.8,
            "range": "± 0.010",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.303,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.819,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.029,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.027,
            "range": "± 0.000",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 37.074,
            "range": "± 0.153",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 0.837,
            "range": "± 0.015",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "755d40bd232ce5acc711ee3a18934a8043e51fad",
          "message": "Assigning `null` to a property tracks",
          "timestamp": "2026-07-14T04:30:51+02:00",
          "tree_id": "149d87bf0ea3fa1179166d7ac1c3dbea5ad2ec49",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/755d40bd232ce5acc711ee3a18934a8043e51fad"
        },
        "date": 1784001148461,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 6.123,
            "range": "± 0.083",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.046,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.119,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.164,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.241,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.245,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.943,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.786,
            "range": "± 0.081",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.123,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.054,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.054,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.072,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 4.086,
            "range": "± 0.025",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.236,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.256,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.087,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.058,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.129,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.11,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.099,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.194,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.049,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.489,
            "range": "± 0.085",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.066,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.038,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 69.227,
            "range": "± 1.057",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.591,
            "range": "± 0.016",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "committer": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "distinct": true,
          "id": "ec64d3bada6bd175bb30a1fd0c065f52c653a22c",
          "message": "fix: infer configured date factory class",
          "timestamp": "2026-07-18T22:01:53-05:00",
          "tree_id": "acf32ef59d2a34bcce0c49793b9b6839c7a11829",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/ec64d3bada6bd175bb30a1fd0c065f52c653a22c"
        },
        "date": 1784432759679,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 5.51,
            "range": "± 0.158",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.039,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.089,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.127,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.199,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.195,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.783,
            "range": "± 0.022",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.561,
            "range": "± 0.057",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.088,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.046,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.041,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 2.741,
            "range": "± 0.073",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.225,
            "range": "± 0.046",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.2,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.057,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.048,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.11,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.072,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.063,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.126,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.741,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.092,
            "range": "± 0.066",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.748,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.025,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.024,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 50.648,
            "range": "± 2.471",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.156,
            "range": "± 0.089",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "e91c13a2cfcb7d1b6cfe1234fc1d1dce8c5fe2fd",
          "message": "`SymbolKind` stores owned strings per span",
          "timestamp": "2026-07-27T05:06:09+02:00",
          "tree_id": "9772db3ac245d8ccda1fcdd8eec4130decf5688a",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/e91c13a2cfcb7d1b6cfe1234fc1d1dce8c5fe2fd"
        },
        "date": 1785122878627,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 3.971,
            "range": "± 0.209",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.048,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.118,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.162,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.231,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.278,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.142,
            "range": "± 0.027",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.16,
            "range": "± 0.051",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.124,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.056,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.053,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.066,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.195,
            "range": "± 0.081",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.152,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.329,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.082,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.053,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.123,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.124,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.099,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.216,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.148,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.046,
            "range": "± 0.185",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.165,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.048,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.045,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 73.626,
            "range": "± 4.685",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.704,
            "range": "± 0.057",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shuvro.nsu.cse@gmail.com",
            "name": "Shuvro Roy",
            "username": "shuvroroy"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "88ba719a9a297ad6bf0e392696b76d3919453428",
          "message": "Route parameter name completion",
          "timestamp": "2026-07-31T23:15:34+02:00",
          "tree_id": "72bf174c87ffbc1b14a072303908269823f91e51",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/88ba719a9a297ad6bf0e392696b76d3919453428"
        },
        "date": 1785551798306,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.881,
            "range": "± 0.673",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.05,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.121,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.164,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.248,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.295,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.183,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.262,
            "range": "± 0.093",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.137,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.061,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.066,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.074,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.427,
            "range": "± 0.042",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.157,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.366,
            "range": "± 0.023",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.08,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.052,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.143,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.122,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.093,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.214,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.117,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.487,
            "range": "± 0.379",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.12,
            "range": "± 0.012",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 56.212,
            "range": "± 0.542",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.745,
            "range": "± 0.048",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "committer": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "distinct": true,
          "id": "b9d0da90554862fe867d6e3b3ca00139f53856cf",
          "message": "docs: update nvim installation instructions\n\nCloses #310",
          "timestamp": "2026-08-01T19:01:44-05:00",
          "tree_id": "ef31ad51851e08623dbed919c501fe3669c0bd31",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/b9d0da90554862fe867d6e3b3ca00139f53856cf"
        },
        "date": 1785646794899,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.267,
            "range": "± 0.321",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.039,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.097,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.144,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.239,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.283,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.253,
            "range": "± 0.027",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.438,
            "range": "± 0.03",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.1,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.052,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.047,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.088,
            "range": "± 0.034",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.168,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.316,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.055,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.042,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.087,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.068,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.197,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.09,
            "range": "± 0.025",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.941,
            "range": "± 0.063",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.115,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 58.752,
            "range": "± 0.386",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.581,
            "range": "± 0.066",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "658dbb8230cbdcafbe813311b95968aa6797c582",
          "message": "A plain function body resolves class names against the file's namespace",
          "timestamp": "2026-08-06T02:50:01+02:00",
          "tree_id": "c4726fa7c48637f8ed8a3ea68ea07dfee92273f4",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/658dbb8230cbdcafbe813311b95968aa6797c582"
        },
        "date": 1785984545050,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.026,
            "range": "± 0.04",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.093,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.139,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.234,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.278,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.21,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.374,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.098,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.049,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.044,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.048,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.762,
            "range": "± 0.028",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.154,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.34,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.053,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.039,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.085,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.068,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.193,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.069,
            "range": "± 0.032",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.687,
            "range": "± 0.112",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.091,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 52.767,
            "range": "± 0.407",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.586,
            "range": "± 0.057",
            "unit": "ms"
          }
        ]
      }
    ]
  }
}