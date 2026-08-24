from pathlib import Path
from image_pipeline import prepare_image, web_filename

repo = Path(__file__).resolve().parents[1]
items = {
    "home/header.webp": "content/home/header/Brenda Ranieri_estudio II.jpg",
    "home/profile.webp": "content/perfil-Brenda Ranieri/412BE8F6-3475-4195-A2C8-2F0102C1AF71_1_105_c.jpeg",
    "situated/burela-01.webp": "content/situated-processes/Material cantera caolin Burela_Brenda Ranieri_2026_14.png",
    "situated/burela-02.webp": "content/situated-processes/Material cantera caolin Burela_Brenda Ranieri_2026_38.png",
    "situated/burela-03.webp": "content/situated-processes/Material cantera caolin Burela_Brenda Ranieri_2026_47.png",
    "situated/paisaje-01.webp": "content/situated-processes/Materiales paisaje sub-urbano_Brenda Ranieri_2026_36.png",
    "situated/paisaje-02.webp": "content/situated-processes/Materiales paisaje sub-urbano_Brenda Ranieri_2026_75 2.png",
    "situated/paisaje-03.webp": "content/situated-processes/Cartografía material_Brenda Ranieri_14.png",
    "situated/formulacion-01.webp": "content/situated-processes/Esmaltes_Brenda Ranieri_2026_52.png",
    "situated/formulacion-02.webp": "content/situated-processes/Lo que queda_Brenda Ranieri_mesa_41.png",
    "situated/formulacion-03.webp": "content/situated-processes/Lo que queda_Brenda Ranieri_mesa_43.png",
    "situated/taller-01.webp": "content/situated-processes/Brenda Ranieri_estudio II.jpg",
    "situated/taller-02.webp": "content/situated-processes/OAX-CAR-38-57_Brenda Ranieri_131.png",
    "situated/taller-03.webp": "content/situated-processes/OAX-CAR-38-57_Brenda Ranieri_136.png",
    "situated/burela-04.webp": "content/situated-processes/Material cantera caolin Burela_Brenda Ranieri_2026_40.png",
    "situated/paisaje-04.webp": "content/situated-processes/Materiales paisaje sub-urbano_Brenda Ranieri_2026_77.png",
    "situated/paisaje-05.webp": "content/situated-processes/Materiales paisaje sub-urbano_Brenda Ranieri_2026_91.png",
    "situated/paisaje-06.webp": "content/situated-processes/Materiales paisaje sub-urbano_Brenda Ranieri_2026_96.png",
    "situated/cartografia-02.webp": "content/situated-processes/Cartografía material_Brenda Ranieri_12.png",
    "situated/formulacion-04.webp": "content/situated-processes/Esmaltes_Brenda Ranieri_2026_10.png",
    "situated/formulacion-05.webp": "content/situated-processes/Esmaltes_Brenda Ranieri_2026_39.png",
    "situated/formulacion-06.webp": "content/situated-processes/Lo que queda_Brenda Ranieri_mesa_11.png",
    "situated/taller-04.webp": "content/situated-processes/OAX-CAR-38-57_Brenda Ranieri_130.png",
    "situated/taller-05.webp": "content/situated-processes/OAX-CAR-38-57_Brenda Ranieri_134.png",
    "situated/taller-06.webp": "content/situated-processes/WIP_La forma del agua quieta_Brenda Ranieri11.png",
    "shared/arcillas-01.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/6A913430-9C9E-4364-8FE1-AF81FA73AD44_1_105_c.jpeg",
    "shared/arcillas-02.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/6F0DDF34-E306-4CD3-BEF0-7FBC0095812E_1_105_c.jpeg",
    "shared/arcillas-03.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/EE3C29C7-314B-4BFD-B6B4-CA7ACE5771F5_1_105_c.jpeg",
    "shared/rayogramas-01.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/53146900-8FEE-4914-825D-CE38F2FBF64C_1_105_c.jpeg",
    "shared/rayogramas-02.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/7BEB5CDF-E8C8-41F2-9FBC-A77C98B532B9_1_105_c.jpeg",
    "shared/rayogramas-03.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/FA22DF58-3A82-4963-BC04-AF507207FD52_1_105_c.jpeg",
    "shared/archivo-01.webp": "content/shared-practices/56B802CC-5143-4A6C-8D04-7FEE176BB413_1_102_o.jpeg",
    "shared/archivo-02.webp": "content/shared-practices/67CC9DAA-85EC-4E21-BAE6-1C12268DD97F_1_102_o.jpeg",
    "shared/archivo-03.webp": "content/shared-practices/B4831D08-156D-4C16-8223-CA5FE020FCDB_1_102_o.jpeg",
    "shared/arcillas-04.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/1F251EEE-930E-4714-8D44-5E11A2FAB0BC_1_105_c.jpeg",
    "shared/arcillas-05.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/4B8829C4-31EC-40FA-9778-02C2B55A0C22_1_105_c.jpeg",
    "shared/arcillas-06.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/92EDE4F5-F6C7-4D77-A0C8-5253FCD0DB38_1_105_c.jpeg",
    "shared/arcillas-07.webp": "content/shared-practices/Taller arcilla salvajes y materiales del paisaje urbano/FE3E2CF7-8A9B-4E50-8083-7E02B115A65F_1_105_c.jpeg",
    "shared/rayogramas-04.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/F81ACF60-0071-43AE-BA21-1B3A01F7C256_1_102_o.jpeg",
    "shared/rayogramas-05.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/EA5E56E0-A33D-4BBD-A0B1-6770C02B14BD_1_102_o.jpeg",
    "shared/rayogramas-06.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/77DF6878-70FD-4F83-9311-6B0139DCCEBB_1_102_o.jpeg",
    "shared/rayogramas-07.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/ED849232-06F2-40D9-9C8B-3AC65FD0B6B2_1_105_c.jpeg",
    "shared/rayogramas-08.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/81F2C18C-E79F-4D89-9BCE-FAB710F4287C_1_105_c.jpeg",
    "shared/rayogramas-09.webp": "content/shared-practices/Rayogramas proyecto OAX-Car-38-57/CEB257CA-DC3A-496D-9EF2-3E19CBDEB012_1_105_c.jpeg",
}

for output_name, source_name in items.items():
    output_group = Path(output_name).parent
    output = repo / "public/images/journal" / output_group / web_filename(source_name)
    prepare_image(repo / source_name, output)
    print(output.relative_to(repo / "public/images/journal"))
